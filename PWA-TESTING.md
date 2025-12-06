# PWA Testing Guide

## Why PWA doesn't work in development mode

The PWA (Progressive Web App) features are **intentionally disabled in development mode** to avoid caching issues during development. This is configured in `next.config.mjs`:

```javascript
disable: process.env.NODE_ENV === 'development'
```

## How to test PWA features locally

### 1. Build the production version

```bash
npm run build
```

This generates the service worker files (`sw.js`, `workbox-*.js`) in the `public/` folder.

### 2. Start the production server

```bash
npm start
```

The app will run on http://localhost:3000

### 3. Test PWA features

#### Install Button
- Open http://localhost:3000 in Chrome/Edge
- The "Install App" button should appear in the bottom-right corner
- Click it to install the PWA

**Note:** The install button only appears if:
- The app is served over HTTPS (or localhost)
- The app is not already installed
- The browser supports PWA installation

#### Offline Mode
1. Open Chrome DevTools (F12)
2. Go to the **Network** tab
3. Check **"Offline"** to simulate offline mode
4. Refresh the page - it should still work!
5. Navigate to different pages - they should load from cache

#### iOS Testing
- Open the app in Safari on iPhone/iPad
- The install button will show instructions for "Add to Home Screen"
- Follow the iOS-specific installation steps

## PWA Features

✅ **Service Worker** - Caches app assets for offline use
✅ **Install Prompt** - Button to install app on home screen
✅ **Offline Support** - App works without internet connection
✅ **App Manifest** - Defines app name, icons, theme colors
✅ **iOS Support** - Special handling for iOS devices

## Testing on Vercel (Production)

When you deploy to Vercel, PWA features work automatically because Vercel serves the app in production mode with HTTPS.

### To test on Vercel:
1. Push your code to GitHub
2. Vercel will automatically deploy
3. Visit your Vercel URL (e.g., https://your-app.vercel.app)
4. The install button should appear
5. Install the PWA and test offline mode

## Troubleshooting

### Install button not showing?
- Make sure you're running **production** mode (`npm start`, not `npm run dev`)
- Check if the app is already installed (uninstall and try again)
- Try a different browser or incognito/private window
- Clear browser cache and service workers in DevTools

### Offline mode not working?
- Check if service worker is registered in DevTools > Application > Service Workers
- Verify the `sw.js` file exists in the `public/` folder
- Clear the service worker and reload: DevTools > Application > Service Workers > Unregister

### Clearing PWA data
In Chrome DevTools:
1. Application tab > Storage
2. Click "Clear site data"
3. This removes cache, service workers, and local storage
