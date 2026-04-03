# SmartPrep Architecture (Mobile-first)

## 1) High-level design
- **Clients**: React Native app (Android-first, Expo) + React web app.
- **Backend**: Node.js + Express with MVC layering.
- **Database**: MongoDB (Users, Notes, Practice Results).
- **AI**: Gemini API for summaries, quizzes, interview feedback, coding generation.
- **Speech-to-text**:
  - Web: Web Speech API.
  - Mobile: `react-native-voice`.

## 2) Backend clean architecture mapping
- **Routes**: HTTP endpoints (`src/routes`).
- **Controllers**: request/response orchestration (`src/controllers`).
- **Services**: AI + extraction logic (`src/services`).
- **Models**: mongoose entities (`src/models`).
- **Middleware**: auth + error handling (`src/middleware`).

## 3) Core feature flow
1. User uploads note -> backend extracts text -> stores note.
2. User requests summary or question generation -> Gemini prompt -> structured JSON response.
3. Voice interview -> client transcribes speech -> backend analyzes transcript with Gemini.
4. Coding practice -> Gemini creates problem + solution with explanation.
5. Gamification -> XP and streak updated via dashboard endpoints.

## 4) Security + reliability
- JWT auth on protected routes.
- Multer memory upload with type checks.
- Centralized API error middleware.
- Per-feature endpoint separation for modular growth.

## 5) Deployment plan
- Backend: Render/Railway/Fly with Mongo Atlas.
- Web: Vercel/Netlify.
- Mobile: Expo EAS build for Android APK/AAB.
