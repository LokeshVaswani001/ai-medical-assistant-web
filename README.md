# AI Medical Assistant — Web Application

Pure React web app (Vite + React Router). No Expo, no React Native, no mobile code — sirf browser ke liye.

## Setup

```bash
npm install
npm run dev
```

Browser mein khud khul jayega (usually `http://localhost:5173`). Vite Node 18+ ke sath (Node 22 samet) bilkul theek chalta hai — pehle wala Metro/Expo Node-version masla ab nahi hoga.

## Build for production

```bash
npm run build      # dist/ folder banega, kisi bhi static host (Vercel, Netlify, etc.) par deploy ho sakta hai
npm run preview     # production build ko locally preview karne ke liye
```

## Design

- Warm paper background, deep sage-teal primary color, Sora (headings) + Space Mono (numbers) font pairing.
- Signature element: `StatReadout` component — har health number (BMI, prediction confidence, heart rate, SpO2) monospace "instrument readout" style mein.
- Fully responsive: desktop/tablet par persistent left sidebar, mobile browser width par top bar + hamburger menu (`src/components/Sidebar.tsx`).

## Routes

| Route | Page |
|---|---|
| `/login` | Login |
| `/signup` | Sign Up |
| `/home` | Dashboard |
| `/symptom-checker` | Symptom Checker |
| `/hospitals` | Nearby Hospitals |
| `/reminders` | Medicine Reminder |
| `/profile` | Profile |
| `/disease-result` | AI Prediction Result |
| `/health-report` | Weekly Health Report |
| `/bmi-calculator` | BMI Calculator |

## Next Steps (Backend Integration)

Data abhi `src/data.ts` mein mock hai:

1. `predictDiseases()` ko real ML API call se replace karein.
2. Login/Signup mein real auth API lagayein (JWT/session, protected routes).
3. Hospitals ke liye Google Maps API integrate karein.
4. Medicine reminders ke liye browser Notifications API ya email/SMS reminders add karein.
