import express from 'express';
import { createServer as createViteServer } from 'vite';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';
import { addDays, startOfDay, endOfDay, format, parseISO, isAfter, isBefore, addMinutes } from 'date-fns';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;

// Google Calendar Setup
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.APP_URL + '/auth/callback' // Not used for refresh token flow but required
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
const sheets = google.sheets({ version: 'v4', auth: oauth2Client });

// API: Lead Signup (Google Sheets)
app.post('/api/leads/signup', async (req, res) => {
  try {
    const { name, email, company, useCase } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!spreadsheetId) {
      console.warn('GOOGLE_SHEET_ID not set. Lead not saved to sheet.');
      return res.json({ success: true, message: 'Lead received (but sheet not configured)' });
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:E',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          new Date().toISOString(),
          name,
          email,
          company || 'N/A',
          useCase || 'N/A'
        ]],
      },
    });

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error saving lead to sheet:', error);
    res.status(500).json({ error: error.message });
  }
});

// API: Get available slots
app.get('/api/calendar/slots', async (req, res) => {
  try {
    const { date } = req.query; // YYYY-MM-DD
    if (!date) return res.status(400).json({ error: 'Date is required' });

    const selectedDate = parseISO(date as string);
    const timeMin = startOfDay(selectedDate).toISOString();
    const timeMax = endOfDay(selectedDate).toISOString();

    // 1. Get busy times
    const freeBusy = await calendar.freebusy.query({
      requestBody: {
        timeMin,
        timeMax,
        items: [{ id: 'primary' }],
      },
    });

    const busySlots = freeBusy.data.calendars?.primary?.busy || [];

    // 2. Generate potential slots (9 AM to 5 PM, 30 min each)
    const slots = [];
    let currentSlot = new Date(selectedDate);
    currentSlot.setHours(9, 0, 0, 0);
    const endOfWorkDay = new Date(selectedDate);
    endOfWorkDay.setHours(17, 0, 0, 0);

    while (isBefore(currentSlot, endOfWorkDay)) {
      const slotEnd = addMinutes(currentSlot, 30);
      
      // Check if slot overlaps with any busy time
      const isBusy = busySlots.some(busy => {
        const busyStart = parseISO(busy.start!);
        const busyEnd = parseISO(busy.end!);
        return (
          (isAfter(currentSlot, busyStart) || currentSlot.getTime() === busyStart.getTime()) &&
          isBefore(currentSlot, busyEnd)
        ) || (
          isAfter(slotEnd, busyStart) &&
          (isBefore(slotEnd, busyEnd) || slotEnd.getTime() === busyEnd.getTime())
        );
      });

      // Also check if slot is in the past
      const now = new Date();
      if (!isBusy && isAfter(currentSlot, now)) {
        slots.push(currentSlot.toISOString());
      }
      
      currentSlot = slotEnd;
    }

    res.json({ slots });
  } catch (error: any) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ error: error.message });
  }
});

// API: Book an event
app.post('/api/calendar/book', async (req, res) => {
  try {
    const { startTime, name, email, company } = req.body;
    if (!startTime || !name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const endTime = addMinutes(parseISO(startTime), 30).toISOString();

    const event = {
      summary: `Growth Audit: ${name} (${company || 'N/A'})`,
      description: `Free Growth Audit for ${name} from ${company || 'N/A'}.\nEmail: ${email}`,
      start: {
        dateTime: startTime,
        timeZone: 'UTC',
      },
      end: {
        dateTime: endTime,
        timeZone: 'UTC',
      },
      attendees: [{ email }],
      conferenceData: {
        createRequest: {
          requestId: `growth-audit-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      reminders: {
        useDefault: true,
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    });

    res.json({ success: true, eventId: response.data.id });
  } catch (error: any) {
    console.error('Error booking event:', error);
    res.status(500).json({ error: error.message });
  }
});

// Vite Integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
