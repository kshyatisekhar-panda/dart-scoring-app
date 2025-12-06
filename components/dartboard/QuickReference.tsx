'use client';

export default function QuickReference() {
  return (
    <div className="bg-gray-800 rounded-lg p-4 text-sm">
      <h3 className="font-bold text-white mb-3">Quick Reference</h3>
      <div className="space-y-2 text-gray-300">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded-full flex-shrink-0"></div>
          <span><strong>Outer Ring (Red/Green)</strong> = Double (2x)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-600 rounded-full flex-shrink-0"></div>
          <span><strong>Inner Ring (Red/Green)</strong> = Triple (3x)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-600 rounded-full flex-shrink-0"></div>
          <span><strong>Between Rings</strong> = Single (1x)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-full flex-shrink-0"></div>
          <span><strong>Outer Bull</strong> = 25 points</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-full flex-shrink-0"></div>
          <span><strong>Bullseye</strong> = 50 points</span>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-400">
        <strong>Tip:</strong> Click anywhere on the dartboard segments to score!
      </div>
    </div>
  );
}
