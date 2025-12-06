# Generate PWA Icons

The current `icon-192x192.png` and `icon-512x512.png` files are placeholders and need to be replaced with proper PNG images generated from the SVG logo.

## Quick Fix: Use Online Tool

### Option 1: PWA Asset Generator (Recommended)
1. Visit https://www.pwabuilder.com/imageGenerator
2. Upload `public/dartboard-logo.svg`
3. Download the generated icons
4. Replace the files in `public/`:
   - `icon-192x192.png`
   - `icon-512x512.png`

### Option 2: RealFaviconGenerator
1. Visit https://realfavicongenerator.net/
2. Upload `public/dartboard-logo.svg`
3. Download and extract the generated icons
4. Copy `android-chrome-192x192.png` → `public/icon-192x192.png`
5. Copy `android-chrome-512x512.png` → `public/icon-512x512.png`

### Option 3: CloudConvert
1. Visit https://cloudconvert.com/svg-to-png
2. Upload `public/dartboard-logo.svg`
3. Set width to 192px, download as `icon-192x192.png`
4. Repeat with width 512px, download as `icon-512x512.png`
5. Place both files in `public/` directory

## Using Command Line (if you have ImageMagick)

```bash
# Install ImageMagick first (if not installed)
# Windows: choco install imagemagick
# Mac: brew install imagemagick
# Linux: sudo apt-get install imagemagick

# Generate icons
magick convert -background none public/dartboard-logo.svg -resize 192x192 public/icon-192x192.png
magick convert -background none public/dartboard-logo.svg -resize 512x512 public/icon-512x512.png
```

## Using Node.js Script

Create a file `generate-icons.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');

async function generateIcons() {
  const svg = fs.readFileSync('public/dartboard-logo.svg');

  // Generate 192x192
  await sharp(svg)
    .resize(192, 192)
    .png()
    .toFile('public/icon-192x192.png');

  // Generate 512x512
  await sharp(svg)
    .resize(512, 512)
    .png()
    .toFile('public/icon-512x512.png');

  console.log('✅ Icons generated successfully!');
}

generateIcons();
```

Then run:
```bash
npm install sharp
node generate-icons.js
```

## After Generating Icons

1. Verify the files:
```bash
ls -lh public/icon-*.png
```

2. Rebuild and test:
```bash
npm run build
npm start
```

3. Test PWA installation - the icons should now appear correctly!

## Why This Matters

- **Current Issue**: Empty/placeholder PNG files cause Chrome to show its default icon
- **After Fix**: Your custom dartboard logo will appear when users install the PWA
- **Best Practice**: PWA manifests require PNG icons for best compatibility across all devices

## Temporary Workaround

The manifest now includes the SVG logo as a fallback, but PNG icons are still needed for full compatibility with all browsers and devices.
