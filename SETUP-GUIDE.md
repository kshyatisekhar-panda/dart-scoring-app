# Dart Scoring App - Setup Guide

## Quick Start

Your dart scoring app is now ready! The development server is running at:
**http://localhost:3000**

## What's Been Built

### Core Features Implemented ✅

1. **Interactive SVG Dartboard**
   - Fully clickable dartboard with all segments
   - Singles, doubles, triples, bull, and bullseye
   - Visual feedback and animations
   - Touch-optimized for mobile devices
   - Haptic feedback on mobile

2. **Game Modes**
   - 501, 301, 701 (X01 games)
   - Cricket (ready for implementation)
   - Around the Clock (ready for implementation)
   - Extensible architecture for more games

3. **Player Management**
   - Add/remove players
   - Player profiles with statistics
   - Historical stats tracking
   - Multi-player support (2-8 players)

4. **Game Play**
   - Real-time scoring
   - Turn-based play
   - Score validation
   - Double in/out rules
   - Automatic win detection
   - Bust detection

5. **PWA Support**
   - Installable on mobile devices
   - Service worker ready
   - Offline capability
   - App manifest configured

6. **State Management**
   - Zustand for global state
   - Local storage persistence
   - Game state preservation

## Testing the App

### 1. Home Page
Open http://localhost:3000 to see:
- New Game button
- Game History (placeholder)
- Players (placeholder)
- Settings (placeholder)

### 2. Create a Game
1. Click "New Game"
2. Select game type (try 501)
3. Add players:
   - Type a name and click "Add"
   - Click on player names to select them
4. Configure rules (Double In/Out)
5. Click "Start Game"

### 3. Play the Game
1. **Click anywhere on the dartboard** to score:
   - Click outer ring for doubles
   - Click inner ring for triples
   - Click middle sections for singles
   - Click center green for bull (25)
   - Click center red for bullseye (50)

2. Each player throws 3 darts per turn
3. Scores update in real-time
4. Click "Next Player" to advance
5. Game detects wins automatically

## File Structure

\`\`\`
dart-scoring-app/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout with PWA config
│   ├── globals.css           # Global styles
│   ├── game/page.tsx         # Main game interface
│   ├── setup/page.tsx        # Game setup & player selection
│   ├── players/page.tsx      # Player management
│   ├── history/page.tsx      # Game history (placeholder)
│   └── settings/page.tsx     # Settings (placeholder)
├── components/
│   └── dartboard/
│       ├── Dartboard.tsx     # Main dartboard component
│       └── DartboardSVG.tsx  # SVG dartboard rendering
├── lib/
│   ├── dartboard-utils.ts    # Dartboard math & calculations
│   └── stores/
│       ├── game-store.ts     # Game state management
│       └── player-store.ts   # Player data management
├── types/
│   ├── game.ts              # Game type definitions
│   ├── player.ts            # Player type definitions
│   └── dartboard.ts         # Dartboard type definitions
└── public/
    └── manifest.json        # PWA manifest
\`\`\`

## Key Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety throughout
- **Tailwind CSS** - Utility-first styling
- **Zustand** - State management with persistence
- **next-pwa** - Progressive Web App support
- **SVG** - Vector graphics for dartboard

## Next Steps

### Immediate Enhancements

1. **Add Real Icons**
   - Replace placeholder icons in \`public/\` folder
   - Create proper 192x192 and 512x512 PNG icons
   - Update favicon.ico

2. **Implement Cricket Mode**
   - Add Cricket scoring logic in game-store
   - Create Cricket-specific UI components
   - Track marks per number (15-20, Bull)

3. **Enhanced Statistics**
   - Calculate player averages correctly
   - Track 180s, 140s, 100s
   - Best 3-dart average
   - Checkout percentage

4. **Undo/Redo**
   - Implement visit history
   - Allow undo last throw
   - Undo last visit

5. **Sound Effects**
   - Add audio files to \`public/sounds/\`
   - Play sounds on dart hits
   - Settings to toggle sounds

6. **Game History**
   - Save completed games
   - Display past games
   - View game details and replays

### Advanced Features

1. **More Game Modes**
   - Shanghai - Round-based scoring
   - Killer - Elimination game
   - Around the World - Sequential hitting
   - Custom game modes

2. **Achievements System**
   - Track player achievements
   - Unlock badges
   - Milestone tracking

3. **Visual Enhancements**
   - Animations for dart hits
   - Score transitions
   - Winner celebrations
   - Dark/light theme toggle

4. **Data Export**
   - Export game data as JSON
   - Export statistics as CSV
   - Share game results

5. **Online Features**
   - Multiplayer over network
   - Leaderboards
   - Social sharing

## Development Commands

\`\`\`bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
npm run type-check  # TypeScript check
\`\`\`

## Customization

### Dartboard Colors
Edit [tailwind.config.ts](tailwind.config.ts#L10-L17) to customize dartboard colors:
\`\`\`typescript
colors: {
  dartboard: {
    black: "#1a1a1a",
    white: "#f5f5f5",
    red: "#dc2626",
    green: "#16a34a",
  },
}
\`\`\`

### Game Rules
Modify game rules in [app/setup/page.tsx](app/setup/page.tsx):
- Add new game types
- Configure starting scores
- Add custom rule options

### State Persistence
Game state and player data are automatically saved to browser localStorage. Clear browser data to reset.

## Troubleshooting

### Dev Server Issues
If the dev server doesn't start:
\`\`\`bash
rm -rf .next
npm run dev
\`\`\`

### TypeScript Errors
Run type checking:
\`\`\`bash
npm run type-check
\`\`\`

### ESLint Warnings
Fix auto-fixable issues:
\`\`\`bash
npm run lint -- --fix
\`\`\`

### PWA Not Working
PWA is disabled in development mode by default. To test PWA:
\`\`\`bash
npm run build
npm start
\`\`\`

Then open in browser and check for "Install App" option.

## Mobile Testing

### Test on Mobile Device

1. Find your local IP address:
   \`\`\`bash
   # Windows
   ipconfig

   # Mac/Linux
   ifconfig
   \`\`\`

2. Start dev server with host flag:
   \`\`\`bash
   npm run dev -- -H 0.0.0.0
   \`\`\`

3. Open on mobile: \`http://YOUR_IP:3000\`

### Install as PWA
1. Build production version: \`npm run build && npm start\`
2. Open on mobile browser
3. Click "Add to Home Screen"
4. App installs like native app

## Support & Documentation

- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs
- Zustand: https://docs.pmnd.rs/zustand

## License

MIT - Feel free to use and modify for your needs!

---

**Enjoy your dart games! 🎯**
