# A Life Less Ordinary — Journal App

A 12-Month Guided Journal for Cerebral Palsy & Special Needs Parents  
*by Sarisha du Plessis*

---

## Deploy to Vercel (Recommended — Free)

### Option A: Drag & Drop (Easiest)

1. Go to [vercel.com](https://vercel.com) and create a free account
2. Run the build locally first:
   ```
   npm install
   npm run build
   ```
3. Drag the `build/` folder into the Vercel dashboard
4. Your app is live! Share the link with anyone.

### Option B: Via GitHub (Best for updates)

1. Create a free account at [github.com](https://github.com)
2. Create a new repository and push this project:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/alilo-journal.git
   git push -u origin main
   ```
3. Go to [vercel.com](https://vercel.com) → "Add New Project" → import your GitHub repo
4. Click Deploy — done!
5. Future updates: just push to GitHub and Vercel auto-deploys.

---

## Deploy to Netlify (Alternative — Also Free)

1. Go to [netlify.com](https://netlify.com) and create a free account
2. Run `npm run build`
3. Drag the `build/` folder into netlify.com/drop
4. Your app is live!

---

## Running Locally

```bash
npm install
npm start
```

Opens at http://localhost:3000

---

## Installing on Mobile (PWA)

Once deployed, users can install it like a native app:

**iPhone / iPad:**
1. Open the app URL in Safari
2. Tap the Share button (box with arrow)
3. Tap "Add to Home Screen"
4. Tap "Add" — it now appears as an app icon!

**Android:**
1. Open the app URL in Chrome
2. Tap the three-dot menu
3. Tap "Add to Home Screen" or "Install App"
4. Done!

---

## Features

- 📊 Overview dashboard with stats & wellness charts
- 📅 12 monthly journal sections (intention, appointments, weekly logs, progress, hard days, self check-in, gratitude)
- 💾 Auto-saves to device storage (works offline)
- 📤 Export / Import backup as JSON file
- 📱 PWA — installable on any phone or tablet
- 🌿 Elegant sage, beige & gold theme

---

## Data & Privacy

All data is saved locally on the user's device using `localStorage`.  
No data is ever sent to any server. Fully private.

Users can export their journal as a JSON backup file at any time.
