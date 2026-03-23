import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';

const app = express();
app.use(express.json());

// CORS — allow dev server, AI Studio, and Cloud Run URLs
const allowedOrigins = [
  'http://localhost:3000',
  'https://aistudio.google.com',
  process.env.APP_URL,
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

// --- OAuth2 Client (pre-authenticated via refresh token) ---
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// --- Config ---
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID!;
const SLOT_DURATION_MINUTES = 30;
const WORK_START_HOUR = 9; // 9:00 AM
const WORK_END_HOUR = 17; // 5:00 PM
const WORK_DAYS = [1, 2, 3, 4, 5]; // Mon–Fri

// --- GET /api/available-slots?date=YYYY-MM-DD ---
app.get('/api/available-slots', async (req, res) => {
  const { date } = req.query as { date: string };

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: 'date parameter required (YYYY-MM-DD)' });
  }

  const dayStart = new Date(`${date}T${String(WORK_START_HOUR).padStart(2, '0')}:00:00Z`);
  const dayEnd = new Date(`${date}T${String(WORK_END_HOUR).padStart(2, '0')}:00:00Z`);

  // Reject weekends
  const dayOfWeek = dayStart.getUTCDay();
  if (!WORK_DAYS.includes(dayOfWeek)) {
    return res.json({ slots: [] });
  }

  try {
    const freeBusyResponse = await calendar.freebusy.query({
      requestBody: {
        timeMin: dayStart.toISOString(),
        timeMax: dayEnd.toISOString(),
        items: [{ id: CALENDAR_ID }],
      },
    });

    const busyBlocks = freeBusyResponse.data.calendars?.[CALENDAR_ID]?.busy ?? [];

    // Generate all 30-min slots in the working window
    const allSlots: { start: string; end: string }[] = [];
    let cursor = new Date(dayStart);
    while (cursor < dayEnd) {
      const slotEnd = new Date(cursor.getTime() + SLOT_DURATION_MINUTES * 60 * 1000);
      allSlots.push({ start: cursor.toISOString(), end: slotEnd.toISOString() });
      cursor = slotEnd;
    }

    // Filter out slots that overlap any busy block
    const availableSlots = allSlots.filter((slot) => {
      const slotStart = new Date(slot.start).getTime();
      const slotEnd = new Date(slot.end).getTime();
      return !busyBlocks.some((busy) => {
        const busyStart = new Date(busy.start!).getTime();
        const busyEnd = new Date(busy.end!).getTime();
        return slotStart < busyEnd && slotEnd > busyStart;
      });
    });

    res.json({ slots: availableSlots });
  } catch (err) {
    console.error('FreeBusy error:', err);
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
});

// --- POST /api/book ---
app.post('/api/book', async (req, res) => {
  const { name, email, company, linkedin, goals, slotStart, slotEnd } = req.body;

  if (!name || !email || !slotStart || !slotEnd) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const event = await calendar.events.insert({
      calendarId: CALENDAR_ID,
      conferenceDataVersion: 1, // Required to generate a Meet link
      sendUpdates: 'all', // Sends email invites to all attendees
      requestBody: {
        summary: `Free Growth Audit — ${name}${company ? ` (${company})` : ''}`,
        description: [
          `Name: ${name}`,
          `Email: ${email}`,
          company ? `Company: ${company}` : null,
          linkedin ? `LinkedIn: ${linkedin}` : null,
          goals ? `Goals: ${goals}` : null,
        ]
          .filter(Boolean)
          .join('\n'),
        start: { dateTime: slotStart, timeZone: 'UTC' },
        end: { dateTime: slotEnd, timeZone: 'UTC' },
        attendees: [
          { email: CALENDAR_ID }, // Calendar owner (host)
          { email }, // User submitting the form
        ],
        conferenceData: {
          createRequest: {
            requestId: `agentmnm-${Date.now()}`, // Must be unique per request
            conferenceSolutionKey: { type: 'hangoutsMeet' },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 1440 }, // 24h before
            { method: 'popup', minutes: 15 },
          ],
        },
      },
    });

    const meetLink =
      event.data.conferenceData?.entryPoints?.find((ep) => ep.entryPointType === 'video')?.uri ??
      null;

    res.json({
      success: true,
      eventId: event.data.id,
      meetLink,
      eventLink: event.data.htmlLink,
    });
  } catch (err) {
    console.error('Booking error:', err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Serve built React app in production
if (isProd) {
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

const PORT = process.env.PORT || process.env.SERVER_PORT || 3001;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
