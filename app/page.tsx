'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Dartboard Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dartboard-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1"/>
              <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
              <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="0.5"/>
              <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dartboard-pattern)" className="text-white"/>
        </svg>
      </div>

      <div className="max-w-4xl w-full space-y-10 text-center relative z-10">
        {/* Hero Section */}
        <div className="space-y-1 animate-fade-in">
          <div className="inline-block">
            <div className="mb-0 animate-bounce-slow">
              <Image
                src="/dartboard-logo.svg"
                alt="Dartboard Logo"
                width={160}
                height={160}
                className="w-24 h-24 md:w-32 md:h-32 mx-auto drop-shadow-2xl"
                priority
              />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-4 drop-shadow-2xl">
            Dart Scorer
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 font-light tracking-wide">
            Professional Scoring System for All Game Modes
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400 flex-wrap">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live Scoring
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Detailed Statistics
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              Offline Support
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-16 px-4">
          <Link
            href="/setup"
            className="group relative bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-8 px-10 rounded-2xl text-xl transition-all transform hover:scale-105 shadow-2xl hover:shadow-green-500/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-3">
              <span className="text-3xl">🎮</span>
              <span>New Game</span>
            </div>
          </Link>

          <Link
            href="/history"
            className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-8 px-10 rounded-2xl text-xl transition-all transform hover:scale-105 shadow-2xl hover:shadow-blue-500/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-3">
              <span className="text-3xl">📊</span>
              <span>Game History</span>
            </div>
          </Link>

          <Link
            href="/players"
            className="group relative bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-8 px-10 rounded-2xl text-xl transition-all transform hover:scale-105 shadow-2xl hover:shadow-purple-500/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-3">
              <span className="text-3xl">👥</span>
              <span>Players</span>
            </div>
          </Link>

          <Link
            href="/settings"
            className="group relative bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-bold py-8 px-10 rounded-2xl text-xl transition-all transform hover:scale-105 shadow-2xl hover:shadow-gray-500/50 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-3">
              <span className="text-3xl">⚙️</span>
              <span>Settings</span>
            </div>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
            <div className="text-4xl mb-3">🎯</div>
            <h3 className="text-lg font-semibold text-white mb-2">Multiple Game Modes</h3>
            <p className="text-sm text-gray-400">Support for 501, 301, 701, Cricket, and more</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
            <div className="text-4xl mb-3">📈</div>
            <h3 className="text-lg font-semibold text-white mb-2">Advanced Statistics</h3>
            <p className="text-sm text-gray-400">Track averages, best rounds, and detailed analytics</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-lg font-semibold text-white mb-2">PWA Enabled</h3>
            <p className="text-sm text-gray-400">Install and use offline on any device</p>
          </div>
        </div>

        {/* Copyright Footer */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-gray-500 text-sm">
          © {new Date().getFullYear()} Kshyatisekhar Panda. All rights reserved.
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}
