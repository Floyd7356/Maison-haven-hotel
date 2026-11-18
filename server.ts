import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT || 3000);

const DATA_DIR = path.resolve(__dirname, 'data');
const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.json');
const ENQUIRIES_FILE = path.join(DATA_DIR, 'enquiries.json');

interface RegistrationRecord {
  id: string;
  fullName: string;
  email: string;
  whatsappNumber: string | null;
  consentAccepted: boolean;
  sourcePage: string;
  createdAt: string;
}

interface EnquiryRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: 'new' | 'reviewed';
  createdAt: string;
}

function ensureDataStore(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(REGISTRATIONS_FILE)) {
    fs.writeFileSync(REGISTRATIONS_FILE, '[]', 'utf8');
  }
  if (!fs.existsSync(ENQUIRIES_FILE)) {
    fs.writeFileSync(ENQUIRIES_FILE, '[]', 'utf8');
  }
}

function readJsonArray<T>(filePath: string): T[] {
  ensureDataStore();
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function writeJsonArrayAtomic<T>(filePath: string, data: T[]): void {
  ensureDataStore();
  const tempPath = `${filePath}.${crypto.randomUUID()}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), 'utf8');
  fs.renameSync(tempPath, filePath);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeText(value: unknown, maxLength: number): string {
  if (typeof value !== 'string') {
    return '';
  }
  return value.trim().slice(0, maxLength);
}

function buildInventoryBlueprint() {
  const units = [];
  for (let roomNumber = 1; roomNumber <= 25; roomNumber += 1) {
    const isStandard = roomNumber <= 10;
    units.push({
      roomNumber,
      category: isStandard ? 'standard' : 'premium',
      nightlyRateNgn: isStandard ? 50000 : 100000,
      maxOccupancy: 2 as const,
      hasBalcony: !isStandard,
      preOpeningStatus: 'pre_opening_preparation' as const,
    });
  }
  return units;
}

function getIntegrationReadiness() {
  return [
    {
      area: 'Pre-Opening Interest & Enquiry Storage',
      currentState: 'active' as const,
      requirement:
        'Currently persisted via local server-side JSON file storage (data/registrations.json & data/enquiries.json). Migrate to managed PostgreSQL / Cloud SQL before multi-instance production launch.',
    },
    {
      area: 'Private Staff Portal Authentication',
      currentState: process.env.ADMIN_ACCESS_TOKEN ? ('active' as const) : ('pending_configuration' as const),
      requirement: process.env.ADMIN_ACCESS_TOKEN
        ? 'Protected by environment-configured ADMIN_ACCESS_TOKEN. Upgrade to RBAC identity provider (Super Administrator, Reception Staff, Management) prior to launch.'
        : 'Set ADMIN_ACCESS_TOKEN in server environment variables to unlock /staff-portal, and integrate RBAC authentication before opening.',
    },
    {
      area: 'Transactional Email (info@maisonhaven.com)',
      currentState: process.env.SMTP_HOST ? ('active' as const) : ('pending_configuration' as const),
      requirement:
        'Configure domain DNS (MX/SPF/DKIM) and SMTP/transactional email credentials so info@maisonhaven.com can receive and send automated guest notifications.',
    },
    {
      area: 'Online Reservations & 100% Upfront Payment',
      currentState: process.env.PAYSTACK_SECRET_KEY ? ('active' as const) : ('pending_configuration' as const),
      requirement:
        'Intentionally disabled during pre-opening. Requires verified payment gateway (e.g., Paystack/Flutterwave) webhook verification and atomic room inventory locking upon official opening.',
    },
  ];
}

async function startServer(): Promise<void> {
  ensureDataStore();

  const app = express();
  app.use(express.json({ limit: '64kb' }));

  app.get('/api/health', (_req, res) => {
    res.json({
      ok: true,
      hotel: 'Maison Haven',
      status: 'pre-opening',
      integrations: getIntegrationReadiness(),
    });
  });

  app.post('/api/interest', (req, res) => {
    const fullName = sanitizeText(req.body?.fullName, 120);
    const email = sanitizeText(req.body?.email, 160).toLowerCase();
    const whatsappRaw = sanitizeText(req.body?.whatsappNumber, 32);
    const consentAccepted = req.body?.consentAccepted === true;
    const sourcePage = sanitizeText(req.body?.sourcePage, 80) || '/';

    if (fullName.length < 2) {
      res.status(400).json({ error: 'Please enter your full name.' });
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }
    if (whatsappRaw && !/^[+\d\s()-]{7,24}$/.test(whatsappRaw)) {
      res.status(400).json({
        error: 'Please enter a valid WhatsApp number or leave the field blank.',
      });
      return;
    }
    if (!consentAccepted) {
      res.status(400).json({
        error: 'Please confirm your consent to receive Maison Haven opening announcements and reservation updates.',
      });
      return;
    }

    const existing = readJsonArray<RegistrationRecord>(REGISTRATIONS_FILE);
    const duplicate = existing.find((item) => item.email === email);
    if (duplicate) {
      res.status(409).json({
        duplicate: true,
        message:
          'This email address is already registered on the Maison Haven pre-opening priority list. We look forward to sharing opening updates with you.',
      });
      return;
    }

    const record: RegistrationRecord = {
      id: `mh_reg_${crypto.randomUUID()}`,
      fullName,
      email,
      whatsappNumber: whatsappRaw || null,
      consentAccepted: true,
      sourcePage,
      createdAt: new Date().toISOString(),
    };

    existing.unshift(record);
    writeJsonArrayAtomic(REGISTRATIONS_FILE, existing);

    res.status(201).json({
      ok: true,
      registrationId: record.id,
      message:
        'Thank you for registering your interest in Maison Haven. Your details have been recorded securely for our pre-opening announcements.',
    });
  });

  app.post('/api/enquiries', (req, res) => {
    const fullName = sanitizeText(req.body?.fullName, 120);
    const email = sanitizeText(req.body?.email, 160).toLowerCase();
    const phone = sanitizeText(req.body?.phone, 32);
    const subject = sanitizeText(req.body?.subject, 160);
    const message = sanitizeText(req.body?.message, 2500);

    if (fullName.length < 2) {
      res.status(400).json({ error: 'Please provide your full name.' });
      return;
    }
    if (!isValidEmail(email)) {
      res.status(400).json({ error: 'Please provide a valid email address.' });
      return;
    }
    if (subject.length < 3) {
      res.status(400).json({ error: 'Please specify an enquiry subject.' });
      return;
    }
    if (message.length < 10) {
      res.status(400).json({ error: 'Please enter a brief message (at least 10 characters).' });
      return;
    }

    const existing = readJsonArray<EnquiryRecord>(ENQUIRIES_FILE);
    const enquiry: EnquiryRecord = {
      id: `mh_enq_${crypto.randomUUID()}`,
      fullName,
      email,
      phone: phone || null,
      subject,
      message,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    existing.unshift(enquiry);
    writeJsonArrayAtomic(ENQUIRIES_FILE, existing);

    res.status(201).json({
      ok: true,
      enquiryId: enquiry.id,
      message:
        'Thank you for writing to Maison Haven. Your enquiry has been recorded. For immediate assistance prior to launch, please reach us directly via telephone or WhatsApp on +234 816 752 4467.',
    });
  });

  app.post('/api/admin/auth', (req, res) => {
    const configuredToken = process.env.ADMIN_ACCESS_TOKEN;
    if (!configuredToken) {
      res.status(503).json({
        configured: false,
        error:
          'Staff portal access is locked because ADMIN_ACCESS_TOKEN has not yet been configured in server environment secrets.',
      });
      return;
    }

    const providedToken = sanitizeText(req.body?.accessToken, 256);
    const tokenBuffer = Buffer.from(providedToken);
    const expectedBuffer = Buffer.from(configuredToken);

    if (
      tokenBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(tokenBuffer, expectedBuffer)
    ) {
      res.status(401).json({ error: 'Invalid administrator access credential.' });
      return;
    }

    res.json({
      ok: true,
      roleScope: 'super_admin',
    });
  });

  app.get('/api/admin/overview', (req, res) => {
    const configuredToken = process.env.ADMIN_ACCESS_TOKEN;
    if (!configuredToken) {
      res.status(503).json({
        configured: false,
        error: 'ADMIN_ACCESS_TOKEN is not configured.',
        integrationReadiness: getIntegrationReadiness(),
      });
      return;
    }

    const authHeader = req.headers.authorization || '';
    const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : '';
    const tokenBuffer = Buffer.from(bearer);
    const expectedBuffer = Buffer.from(configuredToken);

    if (
      tokenBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(tokenBuffer, expectedBuffer)
    ) {
      res.status(401).json({ error: 'Unauthorized.' });
      return;
    }

    const registrations = readJsonArray<RegistrationRecord>(REGISTRATIONS_FILE);
    const enquiries = readJsonArray<EnquiryRecord>(ENQUIRIES_FILE);

    res.json({
      roleScope: 'super_admin',
      registrations,
      enquiries,
      inventoryBlueprint: buildInventoryBlueprint(),
      integrationReadiness: getIntegrationReadiness(),
    });
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Maison Haven server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Maison Haven server:', err);
  process.exit(1);
});
