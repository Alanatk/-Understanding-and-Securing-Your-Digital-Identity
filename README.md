# Understanding and Securing Your Digital Identity

A full-stack cybersecurity educational platform built to help users understand threats, secure their accounts, and review their digital footprint.

## Features Included

- **Premium Dynamic UI**: High-contrast, glassmorphism-inspired design with animated gradient backgrounds, refined CSS transitions, and an engaging, colorful user experience.
- **Digital Identity Dashboard**: View active identity and mocked linked accounts.
- **Password Strength Analyzer**: Real-time entropy calculation, crack time estimation, and custom feedback.
- **MFA Simulation**: Interactive walkthroughs for TOTP, SMS, and Email MFA.
- **Privacy Audit**: Interactive checklist covering Google, Facebook, and LinkedIn.
- **Footprint Scanner**: Backend simulation searching public mock databases for email exposures.
- **Threat Awareness**: Detailed explanation of Phishing, Credential Stuffing, and Identity Theft with simulated AI recommendations.
- **Security Plan**: A final dashboard page that consolidates account protection, privacy actions, and digital hygiene goals.

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React, Vanilla CSS with custom properties, Glassmorphism aesthetics, and Animated Gradients.
- **Backend**: FastAPI, SQLAlchemy (SQLite), passlib (bcrypt), PyJWT.

## Folder Structure
```
/
├── backend/                  # FastAPI Application
│   ├── app/
│   │   ├── main.py           # Entrypoint
│   │   ├── api.py            # API routes (auth, scanner)
│   │   ├── security.py       # JWT & Hashing
│   │   ├── models.py         # SQLAlchemy Data Models
│   │   ├── schemas.py        # Pydantic validation
│   │   └── database.py       # SQLite connect
│   └── venv/                 # Python environment
└── frontend/                 # Next.js Application
    ├── public/               # Static assets
    └── src/
        ├── app/              # App Router and styles
        ├── components/       # (UI elements)
        └── lib/              # API wrapper (fetchAPI)
```

## How to Run Locally

### 1. Backend (FastAPI)
1. Open a terminal and navigate to the project root.
2. `cd backend`
3. Activate virtual environment: `venv\Scripts\activate` (Windows)
4. Run server: `uvicorn app.main:app --reload`
5. The API will be available at http://127.0.0.1:8000
6. Swagger Docs available at http://127.0.0.1:8000/docs

### 2. Frontend (Next.js)
1. Open a second terminal and navigate to the project root.
2. `cd frontend`
3. `npm install`
4. `npm run dev`
5. The frontend will be available at http://localhost:3000

## Deployment Guide

### Backend Deployment (Render / Heroku)
1. Add a `requirements.txt` (`pip freeze > requirements.txt`).
2. Add a `Procfile` containing `web: uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
3. Push to GitHub and connect repository to Render.
4. Set environment variables (e.g. `SECRET_KEY`).
5. (Optional but recommended) Swap the SQLite database url in `database.py` with a PostgreSQL URL provided by the host.

### Frontend Deployment (Vercel)
1. Push your `frontend` folder to a GitHub repository or monorepo.
2. Import the project in Vercel.
3. Set the Framework Preset to Next.js.
4. Add the Environment Variable `NEXT_PUBLIC_API_URL` pointing to your deployed backend URL. *(Note: you will need to update `lib/api.ts` to use this environment variable instead of localhost)*.
5. Click **Deploy**.

## Suggestions for Future Enhancements

- **Real OpenAI Integration**: Replace the mock recommendation engine in the Threat section with a live call to OpenAI's API.
- **HaveIBeenPwned API**: Connect the Digital Footprint Scanner directly to the HIBP API for live breach results instead of simulation.
- **Database Migration**: Switch to PostgreSQL in `database.py` utilizing `alembic` for schema migrations.
- **OAuth Integration**: Allow real linking of Google/Microsoft accounts via OAuth2 to pull in actual avatar/profile details.

## Required Project Documents

The guideline document also expects written deliverables alongside the app. Templates for these are available in the `docs/` folder:

- `docs/project-plan.md`
- `docs/account-security-log.md`
- `docs/privacy-settings-checklist.md`
- `docs/digital-footprint-audit.md`
- `docs/my-digital-identity-security-plan.md`
- `docs/learning-journal.md`

These documents support the final report, project presentation, and weekly security tracking required by the project brief.
