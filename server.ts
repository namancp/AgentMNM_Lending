import express from 'express';
import { createServer as createViteServer } from 'vite';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';
import { addDays, startOfDay, endOfDay, format, parseISO, isAfter, isBefore, addMinutes } from 'date-fns';
import fs from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;

// Google Calendar Setup
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleRefreshToken = process.env.GOOGLE_REFRESH_TOKEN;
const appUrl = process.env.APP_URL || 'http://localhost:3000';

let calendar: any = null;
let sheets: any = null;

if (googleClientId && googleClientSecret && googleRefreshToken) {
  const oauth2Client = new google.auth.OAuth2(
    googleClientId,
    googleClientSecret,
    appUrl + '/auth/callback'
  );

  oauth2Client.setCredentials({
    refresh_token: googleRefreshToken,
  });

  calendar = google.calendar({ version: 'v3', auth: oauth2Client });
  sheets = google.sheets({ version: 'v4', auth: oauth2Client });
} else {
  console.warn('Google API credentials missing. Calendar and Sheets features will be disabled.');
}

// --- FIREBASE SETUP ---
let db: any = null;
try {
  const firebaseConfig = JSON.parse(fs.readFileSync('./firebase-applet-config.json', 'utf8'));
  const firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Error initializing Firebase:', error);
}

// --- GLOBAL STATS ---
let globalAppliedCount = 42; 
let lastActivity: { name: string, location: string, timestamp: number } | null = null;
let lastPingTime = Date.now();

// Sync stats from Firestore on startup
async function syncStatsFromFirestore() {
  if (!db) return;
  try {
    const statsDoc = await getDoc(doc(db, 'stats', 'global'));
    if (statsDoc.exists()) {
      const data = statsDoc.data();
      globalAppliedCount = data.appliedCount || 42;
      lastActivity = data.lastActivity || null;
      console.log('Stats synced from Firestore:', globalAppliedCount);
    } else {
      // Initialize if doesn't exist
      await setDoc(doc(db, 'stats', 'global'), {
        appliedCount: globalAppliedCount,
        lastActivity: null
      });
    }
  } catch (error) {
    console.error('Error syncing stats from Firestore:', error);
  }
}
syncStatsFromFirestore();

const NAMES = ["John", "Sarah", "Michael", "Emma", "David", "Olivia", "James", "Sophia", "Robert", "Isabella", "William", "Mia", "Joseph", "Charlotte", "Thomas", "Amelia"];
const LOCATIONS = ["London", "New York", "Berlin", "Singapore", "San Francisco", "Dubai", "Sydney", "Toronto", "Paris", "Tokyo", "Mumbai", "Austin", "Chicago", "Amsterdam"];

// Background simulation for global growth
function simulateGlobalGrowth() {
  const delay = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000; 
  
  setTimeout(async () => {
    const isActive = (Date.now() - lastPingTime) < 60000;
    
    if (isActive && db) {
      const rand = Math.random();
      let inc = 1;
      if (rand > 0.9) inc = Math.floor(Math.random() * 3) + 5; 
      else if (rand > 0.7) inc = Math.floor(Math.random() * 2) + 2; 
      
      globalAppliedCount += inc;
      
      lastActivity = {
        name: NAMES[Math.floor(Math.random() * NAMES.length)],
        location: LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)],
        timestamp: Date.now()
      };

      // Persist to Firestore
      try {
        await updateDoc(doc(db, 'stats', 'global'), {
          appliedCount: increment(inc),
          lastActivity: lastActivity
        });
      } catch (error) {
        console.error('Error updating stats in Firestore:', error);
      }
    }
    
    simulateGlobalGrowth();
  }, delay);
}
simulateGlobalGrowth();

// API: Ping to keep counter alive
app.post('/api/stats/ping', (req, res) => {
  lastPingTime = Date.now();
  res.json({ success: true });
});

// API: Get global stats
app.get('/api/stats/applied-count', (req, res) => {
  res.json({ 
    count: globalAppliedCount,
    lastActivity 
  });
});

// API: Lead Signup (Google Sheets + Firestore)
app.post('/api/leads/signup', async (req, res) => {
  try {
    const { name, email, company, useCase } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Increment global count on real signup
    globalAppliedCount += 1;
    lastActivity = { name, location: 'Somewhere', timestamp: Date.now() };

    // Persist to Firestore
    if (db) {
      try {
        await updateDoc(doc(db, 'stats', 'global'), {
          appliedCount: increment(1),
          lastActivity: lastActivity
        });
        await addDoc(collection(db, 'leads'), {
          name,
          email,
          company: company || '',
          useCase: useCase || '',
          timestamp: Date.now()
        });
      } catch (error) {
        console.error('Error persisting to Firestore:', error);
      }
    }

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    if (!sheets || !spreadsheetId) {
      console.warn('Google Sheets not configured. Lead not saved to sheet.');
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
    if (!calendar) {
      return res.status(503).json({ error: 'Calendar service not configured' });
    }
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
    if (!calendar) {
      return res.status(503).json({ error: 'Calendar service not configured' });
    }
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

// --- ADMIN: Private Health Check ---
// You can check this by going to your-app-url.run.app/api/admin/health
app.get('/api/admin/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    integrations: {
      googleCalendar: !!calendar,
      googleSheets: !!sheets,
      googleSheetId: !!process.env.GOOGLE_SHEET_ID,
    },
    stats: {
      globalAppliedCount,
      lastActivity
    }
  });
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
