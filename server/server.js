/**
 * ═══════════════════════════════════════════════════════════════
 *  Innovation Conclave 2026 — API Gateway
 *  Architecture: Controller → Service → Model (per microservice)
 * ═══════════════════════════════════════════════════════════════
 */
require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');

const app  = express();
const PORT = process.env.PORT || 4000;

// ─── Ensure upload directories exist ─────────────────────────────────────────
['uploads/participants', 'uploads/exhibitors'].forEach(dir => {
  const full = path.join(__dirname, dir);
  if (!fs.existsSync(full)) fs.mkdirSync(full, { recursive: true });
});

// ─── Global Middleware ───────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically: GET /uploads/<subfolder>/<filename>
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── Microservice Routes (API Gateway) ───────────────────────────────────────
app.use('/api/auth',         require('./services/auth/auth.routes'));
app.use('/api/participants', require('./services/participants/participant.routes'));
app.use('/api/exhibitors',   require('./services/exhibitors/exhibitor.routes'));
app.use('/api/workshops',    require('./services/workshops/workshop.routes'));
app.use('/api/agenda',       require('./services/agenda/agenda.routes'));
app.use('/api/subscriptions',require('./services/subscriptions/subscription.routes'));


// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) =>
  res.json({ success: true, data: { status: 'ok', time: new Date().toISOString() } })
);

// ─── 404 Fallback ─────────────────────────────────────────────────────────────
app.use((req, res) =>
  res.status(404).json({ success: false, error: 'Route not found' })
);

// ─── Global Error Handler ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error('[UNHANDLED ERROR]', err.message);
  res.status(500).json({ success: false, error: err.message || 'Internal server error' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  ✅  Innovation Conclave API Gateway`);
  console.log(`  📡  http://localhost:${PORT}`);
  console.log(`  🏗️  Architecture: Controller → Service → Model\n`);
  console.log(`  Microservices:`);
  console.log(`    • Auth          /api/auth`);
  console.log(`    • Participants  /api/participants`);
  console.log(`    • Exhibitors    /api/exhibitors`);
  console.log(`    • Workshops     /api/workshops\n`);
});
