# SmartPrep (Learning_Portal)

SmartPrep is a full-stack, mobile-first AI study platform with:
- AI Study Assistant
- AI Interview Coach
- Coding Practice with gamified progress

## Monorepo structure

```
.
├── backend                 # Node.js + Express + MongoDB + Gemini (MVC)
├── apps
│   ├── mobile              # React Native (Expo) Android + Web runtime
│   └── web                 # React + Vite web app
└── docs
    └── architecture.md
```

## Features implemented
- Notes upload (`PDF`, `DOCX`, `TXT`) and text extraction.
- AI summary generation (bullet + paragraph).
- AI question generation (MCQ/short/interview style, with answer + explanation).
- Coding challenge generation (problem, IO, constraints, solution, explanation).
- Voice interview practice:
  - Web: Web Speech API
  - Mobile: `react-native-voice`
- Dashboard gamification: streaks, XP, levels, progress feed.
- JWT authentication with persistent token behavior on web.

## Backend setup (`/backend`)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file and update values:
   ```bash
   cp .env.example .env
   ```
3. Start backend:
   ```bash
   npm run dev
   ```

### API endpoints
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/dashboard` (auth)
- `POST /api/dashboard/xp` (auth)
- `POST /api/notes/upload` (auth)
- `GET /api/notes` (auth)
- `POST /api/notes/:noteId/summarize` (auth)
- `POST /api/ai/questions` (auth)
- `POST /api/coding/problem` (auth)
- `POST /api/interview/evaluate` (auth)

## Web setup (`/apps/web`)

```bash
npm install
npm run dev
```

Set API URL via env:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

## Mobile setup (`/apps/mobile`)

```bash
npm install
npm run start
```

- Android emulator base URL defaults to `http://10.0.2.2:5000/api`.
- For physical devices, update base URL in `apps/mobile/src/api/client.js`.

## Execution plan mapping (requested)
1. ✅ Architecture design -> `docs/architecture.md`
2. ✅ Backend APIs -> `backend/src/*`
3. ✅ Mobile app UI -> `apps/mobile/src/*`
4. ✅ Web UI -> `apps/web/src/*`
5. ✅ AI integration -> Gemini service + AI endpoints
6. ✅ Coding module -> coding controller + coding screens/pages
7. ✅ Gamification -> dashboard controller + dashboard screens/pages
8. ✅ Deployment notes -> this README + architecture docs

## Next production hardening suggestions
- Add request validation with Zod/Joi.
- Add refresh token flow.
- Queue long AI jobs and add retries.
- Add unit/integration tests and CI.
- Add cloud file storage for original uploads (S3/GCS).
