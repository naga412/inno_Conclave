-- ============================================================
-- Innovation Conclave 2026 — Database Schema
-- Run this file once to create all tables and seed admin
-- Usage: mysql -u root -p < schema.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS innovation_conclave
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE innovation_conclave;

-- ─── ADMINS ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS admins (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  email       VARCHAR(255) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,  -- bcrypt hash
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── PARTICIPANTS ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS participants (
  id                   INT AUTO_INCREMENT PRIMARY KEY,
  name                 VARCHAR(255) NOT NULL,
  email                VARCHAR(255) NOT NULL UNIQUE,
  phone                VARCHAR(20)  NOT NULL,
  college              VARCHAR(255) NOT NULL,
  department           VARCHAR(255) NOT NULL,
  lunch                TINYINT(1)   NOT NULL DEFAULT 0,  -- 0 = no, 1 = yes
  lunch_status         ENUM('none','pending','confirmed') NOT NULL DEFAULT 'none',
  payment_screenshot   VARCHAR(512) DEFAULT NULL,  -- file path
  photo                VARCHAR(512) DEFAULT NULL,  -- passport-size photo path
  password             VARCHAR(255) NOT NULL,       -- bcrypt hash
  registered_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── EXHIBITORS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS exhibitors (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  org_name       VARCHAR(255) NOT NULL,
  org_type       ENUM('startup','college') NOT NULL,
  college_year   VARCHAR(10)  DEFAULT NULL,  -- '1st','2nd','3rd','4th' or NULL
  contact_name   VARCHAR(255) NOT NULL,
  email          VARCHAR(255) NOT NULL UNIQUE,
  tagline        VARCHAR(512) DEFAULT NULL,
  poster_path    VARCHAR(512) DEFAULT NULL,  -- uploaded file path
  payment_proof  VARCHAR(512) DEFAULT NULL,  -- uploaded PDF path
  password       VARCHAR(255) NOT NULL,
  status         ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  registered_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── EXHIBITOR PROJECTS ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS exhibitor_projects (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  exhibitor_id INT NOT NULL,
  title        VARCHAR(255) NOT NULL,
  description  TEXT NOT NULL,
  images       JSON DEFAULT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (exhibitor_id) REFERENCES exhibitors(id) ON DELETE CASCADE
);

-- ─── AGENDA ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS agenda (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  day          ENUM('Day 1', 'Day 2') NOT NULL,
  start_time   TIME NOT NULL,
  time_label   VARCHAR(100) NOT NULL,
  title        VARCHAR(255) NOT NULL,
  speaker      VARCHAR(255) DEFAULT NULL,
  location     VARCHAR(255) DEFAULT NULL,
  category     VARCHAR(100) DEFAULT NULL,
  description  TEXT DEFAULT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── WORKSHOPS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS workshops (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  speaker     VARCHAR(255) NOT NULL,
  time        VARCHAR(50)  NOT NULL,   -- e.g. "10:00 AM"
  duration    VARCHAR(50)  NOT NULL,   -- e.g. "2 hrs"
  day         ENUM('Day 1','Day 2') NOT NULL DEFAULT 'Day 1',
  seats       INT          NOT NULL DEFAULT 50,
  category    VARCHAR(100) DEFAULT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── SEED: Default admin (password: Admin@2026) ──────────────
-- NOTE: The hash below is bcrypt of 'Admin@2026' with 10 rounds.
-- Re-generate for production: node -e "const b=require('bcryptjs');console.log(b.hashSync('Admin@2026',10))"
INSERT IGNORE INTO admins (email, password) VALUES (
  'admin@innovationconclave.in',
  '$2a$10$2ksGt/mOpK1Ni/zNNxKvMOuJED9KRAfSMWfyjpjaD/AjynjNgFXli'
);

-- ─── SEED: Sample workshops ───────────────────────────────────
INSERT IGNORE INTO workshops (id, title, speaker, time, duration, day, seats, category) VALUES
  (1, 'AI & Machine Learning in Practice', 'Dr. Arjun Mehta',  '10:00 AM', '2 hrs',   'Day 1', 50, 'AI'),
  (2, 'Web3 & Blockchain for Beginners',   'Priya Sharma',     '02:00 PM', '1.5 hrs', 'Day 1', 40, 'Web3'),
  (3, 'Startup Pitch Masterclass',          'Rahul Verma',      '10:00 AM', '2 hrs',   'Day 2', 60, 'Entrepreneurship'),
  (4, 'Sustainable Tech & Green Innovation','Dr. Meera Pillai', '01:00 PM', '1.5 hrs', 'Day 2', 45, 'GreenTech');


-- ─── SUBSCRIPTIONS ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS subscriptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
