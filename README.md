# 🎯 Dart Scoring App

A professional, mobile-first Progressive Web App (PWA) for scoring dart games. Built with Next.js, React, TypeScript, and Tailwind CSS.

## About Darts

Darts is a precision sport where players throw small missiles (darts) at a circular target (dartboard) mounted on a wall. Dating back to medieval England, darts has evolved from a pub game into a professional sport with international competitions and millions of players worldwide.

### The Standard Dartboard

The modern dartboard is divided into 20 numbered sections scoring from 1 to 20 points, arranged in a specific non-sequential order to penalize inaccuracy. The board features:

- **20 numbered segments** arranged clockwise: 20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20...
- **Double Ring** (outer narrow band): Doubles the segment's value
- **Triple Ring** (inner narrow band): Triples the segment's value
- **Outer Bull** (outer center circle): Worth 25 points
- **Bullseye** (inner center circle): Worth 50 points and counts as a double

The highest possible score with three darts is **180** (three triple-20s), commonly called a "ton-eighty" and considered a prestigious achievement in competitive play.

### Why Darts is Strategic

While darts appears simple, it combines physical precision with mathematical strategy:

- **Risk vs Reward**: Triple-20 (60 points) offers the highest single-dart score but sits between triple-1 and triple-5, making misses costly
- **Checkout Mastery**: Finishing a game requires hitting exact scores, often under pressure, with knowledge of optimal checkout combinations
- **Mental Arithmetic**: Players must instantly calculate remaining scores and best dart combinations
- **Pressure Management**: Professional players maintain consistency while under intense mental pressure, especially during game-finishing throws

This app brings the authentic dart-scoring experience to your mobile device, helping players track scores, improve their game, and compete with friends!

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
- ✅ Winner celebration screen with confetti
- ✅ Tournament/game naming support
- ✅ Export games to PDF, PNG, or JSON
- ✅ Round-by-round detailed statistics
- ✅ 3-dart average calculation
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

### X01 Games (501/301/701)

The X01 format is the most popular competitive dart game worldwide, used in professional tournaments including the PDC World Championship.

**Basic Rules:**
- Each player starts with the specified score (501, 301, or 701)
- Players take turns throwing 3 darts per visit
- Each dart's score is subtracted from the remaining total
- First player to reach exactly 0 wins the leg
- Players must finish on exactly 0 - overshooting results in a "bust"

**Game Variations:**

- **Double Out** (Standard Tournament Rule): The final dart must land in a double segment (including bullseye = double-bull). This is the most common competitive format.
- **Double In** (Advanced): Players must hit a double before they can begin scoring. All initial throws are void until a double is hit.
- **Straight In/Out**: No double requirements, making the game simpler but less strategic.

**Bust Rules:**
- Scoring more than the remaining score = BUST (turn ends, score reverts to start of turn)
- Scoring exactly 1 with double-out = BUST (no double available to finish)
- On a bust, the player's score returns to what it was before that turn began

**Strategic Elements:**
- **The Outshot**: Knowing optimal finishing combinations is crucial. For example, 170 (T20-T20-Bull) is the highest possible checkout.
- **Setup Scores**: Players aim for specific scores (e.g., 32, 40, 50) that offer multiple double-out options.
- **Bogey Numbers**: Scores like 169, 168, 166, etc., cannot be finished in three darts, requiring careful planning.

### Cricket (Coming Soon)

A strategic game of territorial control popular in North America.

**Objective:** Close numbers 15-20 and bullseye before your opponent while scoring maximum points.

**Rules:**
- Only numbers 15, 16, 17, 18, 19, 20, and the bullseye are in play
- Hit each number 3 times to "close" it:
  - Single = 1 mark
  - Double = 2 marks
  - Triple = 3 marks (instant close!)
- Once you close a number and opponent hasn't, additional hits score points equal to that number
- Bullseye: Outer = 25 points, Inner = 50 points
- First player to close all numbers AND have equal or more points wins

**Strategy:**
- Close high numbers (20, 19, 18) first for scoring opportunities
- Balance between closing your numbers and blocking opponent's scoring
- The bullseye decision: Close it early or save it for late-game points?

### Around the Clock (Coming Soon)

A sequential accuracy challenge perfect for practice.

**Rules:**
- Hit numbers 1 through 20 in order, then finish with the bullseye
- Each number must be hit once before advancing
- Doubles and triples count the same as singles
- First player to complete 1-20 and hit the bull wins

**Variation - Doubles Around the Clock:**
- Must hit the double of each number to advance
- Popular for training double accuracy

## Dart Terminology

Understanding dart terminology enhances your appreciation of the game:

### Scoring Terms
- **Ton**: 100 points scored in a single turn (3 darts)
- **Ton-80 / 180**: Maximum possible score with 3 darts (T20-T20-T20)
- **High Ton**: Any score from 150-180
- **Low Ton**: Any score from 100-149
- **Twenty-Six**: The bed of 20 (since there's a 5 and 1 on either side)
- **Bag o' Nuts**: Score of 45 (sometimes 25)
- **Breakfast / Chips**: Score of 26 (single 20, single 5, single 1)

### Checkout Terms
- **Checkout / Outshot**: The finishing combination to reach exactly zero
- **Bogey Number**: A score that cannot be checked out with the darts remaining
- **Baby**: The number 1
- **Madhouse**: Double 1 - notoriously difficult finish
- **Tops**: Double 20 - the most popular finishing double
- **Double Top**: Same as tops, double 20
- **Bull**: The outer bullseye (25 points)
- **Double Bull**: The inner bullseye (50 points)

### Game Terms
- **Leg**: A single game from starting score to zero
- **Set**: A group of legs (typically best of 3 or 5 legs)
- **Visit / Turn**: A player's turn throwing 3 darts
- **Bust**: When a player's score goes below zero or to 1 (with double-out), ending their turn with no score change
- **Remaining / Left**: The score a player has left to reach zero

### Throwing Terms
- **Robin Hood**: When a dart sticks into the shaft of another dart already in the board
- **Shanghai**: Hitting a single, double, and triple of the same number in one turn
- **Hat Trick**: Three bullseyes in one turn (or three of any target in sequence)
- **Three in a Bed**: Three darts in the same scoring segment (e.g., three triple-20s)
- **Splash and Dash**: Quick scoring approach, throwing darts rapidly
- **Annie's Room**: The number 1, specifically in the phrase "Annie's Room in the Madhouse" (Double 1)

### Playing Style Terms
- **Arrows**: Another name for darts themselves
- **Oche** (pronounced "ockey"): The throw line, 7 feet 9.25 inches (2.37m) from the board
- **Grouping**: How close together a player's darts land
- **Checkout %**: Percentage of checkout opportunities successfully completed
- **Three-Dart Average**: Total points scored divided by total darts thrown, multiplied by 3
- **Maximum / Max**: A 180 score
- **Nine-Darter**: A perfect 501 game completed in just 9 darts (minimum possible)

### Common Finishes to Know
- **170**: T20-T20-Bull (highest possible checkout)
- **161**: T20-T17-Bull
- **110**: T20-Bull (popular two-dart finish)
- **121**: T17-T18-D20 or T20-T11-D14
- **104**: T18-T18-D5
- **90**: T20-D15 or T18-D18
- **40**: D20 (most common finishing number in professional play)

### Etiquette Terms
- **Good Darts**: Traditional congratulation after a good throw
- **Chalker / Caller**: The person keeping score (though now often electronic)
- **Flight**: The fin at the back of the dart that stabilizes its trajectory
- **Shaft / Stem**: The piece connecting the barrel to the flight

This rich vocabulary reflects darts' deep cultural history and adds color to the competitive atmosphere!

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

- [ ] More game modes (Shanghai, Killer, Bob's 27, etc.)
- [ ] Multiplayer online support
- [ ] Advanced statistics and charts (checkout percentage graphs, form tracking)
- [ ] Achievement system with badges
- [ ] Custom themes and color schemes
- [ ] Voice scoring with speech recognition
- [ ] Game replay feature with visual playback
- [ ] Tournament bracket management
- [ ] Practice mode with accuracy tracking
- [ ] Social features and leaderboards
- [ ] Suggested checkouts for remaining scores
- [ ] Video recording of games
- [ ] AI opponent with difficulty levels

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Credits

Created and maintained by **Kshyatisekhar Panda**

© 2025 Kshyatisekhar Panda. All rights reserved.

---

**Live Demo:** [Add your Vercel URL here once deployed]

**Repository:** [github.com/kshyatisekhar-panda/dart-scoring-app](https://github.com/kshyatisekhar-panda/dart-scoring-app)
