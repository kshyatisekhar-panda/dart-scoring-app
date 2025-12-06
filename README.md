# 🎯 Dart Scoring App

A professional, mobile-first Progressive Web App (PWA) for scoring dart games. Built with Next.js, React, TypeScript, and Tailwind CSS.

## Features

### Game Modes
- **501/301/701** - Classic countdown dart games
- **Cricket** - Mark and close numbers 15-20 + bullseye
- **Around the Clock** - Hit numbers in sequence
- More game modes coming soon!

### Core Features
- ✅ Interactive SVG dartboard with clickable segments
- ✅ Multi-player support (2-8 players)
- ✅ Real-time score tracking and statistics
- ✅ Player profiles with historical stats
- ✅ PWA support - install on mobile devices
- ✅ Offline functionality
- ✅ Responsive design for mobile and desktop
- ✅ Haptic feedback on mobile devices
- ✅ Touch-optimized UI

### Technical Features
- **Next.js 14** with App Router
- **TypeScript** with strict mode
- **Tailwind CSS** for styling
- **Zustand** for state management
- **PWA** with service worker caching
- **Local Storage** for data persistence
- **ESLint** with recommended rules

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository or navigate to the project directory

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## Usage

### Starting a New Game

1. Click **"New Game"** on the home screen
2. Select your game type (501, 301, Cricket, etc.)
3. Configure game rules (Double In/Out)
4. Add or select players
5. Click **"Start Game"** to begin

### Playing

1. **Click on the dartboard** to score - all segments are clickable:
   - Click the number segments for single, double, or triple scores
   - Click the center for bull (25) or bullseye (50)
2. Enter **3 darts** per turn
3. Scores are displayed in real-time
4. Click **"Next Player"** to advance to the next player
5. Game automatically detects wins and checkout conditions

### Dartboard Layout

The interactive dartboard follows standard dart board numbering:
- **Outer ring (red/green)**: Double scores (2x)
- **Inner ring (red/green)**: Triple scores (3x)
- **Single sections**: 1x score
- **Outer bull (green)**: 25 points
- **Inner bullseye (red)**: 50 points (double bull)

## Project Structure

\`\`\`
dart-scoring-app/
├── app/                    # Next.js app directory
│   ├── game/              # Game play page
│   ├── setup/             # Game setup page
│   ├── players/           # Player management
│   ├── history/           # Game history
│   └── settings/          # App settings
├── components/
│   └── dartboard/         # Dartboard components
├── lib/
│   ├── dartboard-utils.ts # Dartboard calculations
│   └── stores/            # Zustand stores
├── types/                 # TypeScript definitions
└── public/                # Static assets
\`\`\`

## Game Rules

### 501/301/701
- Start with the specified score (501, 301, or 701)
- Subtract each dart score from remaining total
- First player to reach exactly 0 wins
- **Double Out**: Must finish with a double
- **Double In**: Must start scoring with a double
- **Bust**: Score goes below 0 or equals 1 (with double out)

### Cricket (Coming Soon)
- Close numbers 15-20 and bullseye
- Mark each number 3 times to close it
- Score points on closed numbers while opponent's is still open

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler check

### Code Style

The project uses:
- **ESLint** with Next.js and TypeScript recommended rules
- **Strict TypeScript** configuration
- **Tailwind CSS** for styling
- **Prettier-compatible** formatting

## PWA Features

The app is a Progressive Web App with:
- ✅ Installable on mobile devices
- ✅ Offline functionality
- ✅ App icon and splash screen
- ✅ Service worker caching
- ✅ Fast loading times

To install on mobile:
1. Open the app in your mobile browser
2. Click "Add to Home Screen" (iOS) or "Install" (Android)
3. Launch like a native app

## Browser Support

- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile browsers with modern JavaScript support

## Future Enhancements

- [ ] More game modes (Shanghai, Killer, etc.)
- [ ] Multiplayer online support
- [ ] Advanced statistics and charts
- [ ] Achievement system
- [ ] Custom themes
- [ ] Voice scoring
- [ ] Game replay feature
- [ ] Export game data
- [ ] Social features

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
