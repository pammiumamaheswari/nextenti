# 🏥 MedVance AI — Full-Stack Healthcare Career & Talent Marketplace

An original, production-ready healthcare career ecosystem connecting certified medical professionals (*Doctors, Critical Care Nurses, Pharmacists, Technologists, Healthcare IT Leaders*) with accredited healthcare institutions (*Quaternary Hospitals, Diagnostics Networks, Clinics, HealthTech Startups*).

---

## 🌟 1. System Architecture & Capabilities

MedVance AI brings together:
1. **Healthcare Professional Social & Profile Hub** — Dynamic profile strength calculation, State Medical Council registration validation, and clinical procedural tracking.
2. **Intelligent Job Marketplace** — Backend-driven multi-parameter filtering, compensation banding, and location indexing.
3. **7-Factor AI Matching Engine** — Real-time candidate-to-job fit scoring with deterministic fallback:
   - Profession Match (25%)
   - Specialization Fit (20%)
   - Experience Band Alignment (15%)
   - Procedural & Clinical Skills (20%)
   - Hospital Location (10%)
   - Salary Fit (5%)
   - Medical Council Licenses (5%)
4. **Recruitment SaaS Suite** — 6-stage interactive Kanban applicant tracker, clinical interview scheduler, and hiring funnel analytics.
5. **Real-Time Communication** — Socket.IO instant messaging, typing indicators, and in-app event notifications.
6. **Medical Credential Verification** — Administrative audit workflow for medical licenses and certificates.

---

## 🚀 2. Quick Start & Setup

### Prerequisites
- **Node.js**: v18.x or v20.x+
- **MongoDB**: v6.x or v7.x (or MongoDB Atlas)

### Step 1: Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Configure Environment Variables
Copy `.env.example` in `backend/`:
```bash
cp .env.example .env
```

### Step 3: Seed Realistic Healthcare Demo Data
Populates the database with realistic Indian healthcare professionals (*Dr. Ananya Rao, Dr. Arjun Mehta, Priya Nair*), hospital institutions (*NovaCare Health, Medisphere Hospitals*), jobs, and clinical articles:
```bash
cd backend
npm run seed
```

### Step 4: Run Development Servers
```bash
# Run Backend API Server (Port 5000)
cd backend
npm run dev

# Run Frontend Vite Web App (Port 5173)
cd frontend
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 👥 3. 1-Click Interactive Demo Personas

The platform includes a top-bar **Demo Persona Switcher** to instantly test all user roles without manual login:

| Persona | Name | Role | Focus / Access |
| :--- | :--- | :--- | :--- |
| 👨‍⚕️ **Doctor** | Dr. Ananya Rao | `PROFESSIONAL` | Interventional Cardiologist, AI Job Match, Applications Tracker |
| 👩‍⚕️ **Nurse** | Priya Nair | `PROFESSIONAL` | Lead ICU Staff Nurse, Credential Verification Vault |
| 🏥 **Recruiter** | NovaCare HR Team | `ORGANIZATION_ADMIN` | Post Jobs Wizard, Kanban Pipeline, Candidate Search, Interviews |
| 🛡️ **Admin** | Dr. Rajesh Sharma | `SUPER_ADMIN` | Verification Audits, KPI Analytics, User Moderation |

---

## 📚 4. REST API Documentation (`/api/v1`)

### Authentication & Profiles
- `POST /auth/register` — Register a healthcare professional or hospital organization.
- `POST /auth/login` — Authenticate and receive JWT access and refresh tokens.
- `POST /auth/refresh` — Refresh expired access token.
- `GET /auth/me` — Retrieve active user session and linked profile.
- `GET /professionals/me` & `PUT /professionals/me` — Manage practitioner profile.
- `POST /professionals/resume` — Upload resume (PDF, DOCX) with Multer validation.

### Jobs & Search
- `GET /jobs` — Multi-filter search (keyword, profession, location, experience, salary, workMode, jobType).
- `GET /jobs/:id` — View full job details, responsibilities, requirements, and AI match score.
- `POST /jobs` — Create a new clinical vacancy (Requires `ORGANIZATION_ADMIN` or `RECRUITER`).
- `PUT /jobs/:id` — Update job parameters.
- `GET /saved-jobs` & `POST /saved-jobs/:jobId` — Toggle saved bookmarks.

### Recruitment & Pipeline
- `POST /jobs/:jobId/apply` — Submit application with AI match scoring and notification triggers.
- `GET /applications/me` — View professional's active applications and milestone tracker.
- `GET /applications/org` — Hospital candidate inbox.
- `PATCH /applications/:id/status` — Advance application status in recruitment pipeline.
- `POST /interviews` & `GET /interviews` — Clinical round scheduler with video links.

### AI Engine & Career Tools
- `POST /ai/match` — Calculate 7-factor match between job and profile.
- `POST /ai/resume-review` — Audit CV keywords, strengths, and NABH compliance.
- `POST /ai/career-advice` — Conversational healthcare career mentorship.

### Medical Credential Audits & Admin
- `POST /verifications/submit` — Submit medical council certificates.
- `GET /verifications/all` & `PATCH /verifications/:id/review` — Admin credential audit.
- `GET /admin/metrics` — Platform KPIs and growth telemetry.

---

## 🛠️ 5. Technology Stack Summary

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite, Lucide Icons, Recharts, React Router v6.
- **Backend**: Node.js, Express.js, TypeScript, Mongoose, Socket.IO, Bcrypt.js, JsonWebToken.
- **Database**: MongoDB with compound indexes for instant clinical search.
- **Design Language**: Deep Medical Navy (`#102A43`), Clinical Teal (`#0F766E`), Mint (`#DFF7F2`), Slate (`#F8FAFC`).
