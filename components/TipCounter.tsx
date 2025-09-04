'use client';

import { useEffect, useState } from 'react';
import { Heart, Zap } from 'lucide-react';

interface TipCounterProps {
  totalTips: number;
  remainingTips: number;
  isActive: boolean;
  onTipAnimation: () => void;
}

export function TipCounter({ totalTips, remainingTips, isActive, onTipAnimation }: TipCounterProps) {
  const [animating, setAnimating] = useState(false);
  const [displayTips, setDisplayTips] = useState(totalTips);

  useEffect(() => {
    if (totalTips > displayTips) {
      setAnimating(true);
      onTipAnimation();
      
      // Animate counter increment
      const increment = () => {
        setDisplayTips(prev => {
          if (prev < totalTips) {
            return prev + 1;
          }
          setAnimating(false);
          return totalTips;
        });
      };
      
      const timer = setInterval(increment, 100);
      return () => clearInterval(timer);
    }
  }, [totalTips, displayTips, onTipAnimation]);

  const progressPercentage = remainingTips > 0 ? ((1000 - remainingTips) / 1000) * 100 : 100;

  return (
    <div className="card text-center space-y-6">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Zap className="w-8 h-8 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-800">Tip Counter</h2>
      </div>
      
      <div className={`counter-display ${animating ? 'animate-bounce-gentle' : ''}`}>
        {displayTips.toLocaleString()}
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tips Received</span>
          <span>{remainingTips} remaining</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 text-sm">
        <Heart className="w-4 h-4 text-red-500" />
        <span className="text-gray-600">
          ${(displayTips * 0.01).toFixed(2)} USDC distributed
        </span>
      </div>
      
      {!isActive && remainingTips === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-yellow-800 text-sm font-medium">
            🎉 All tips have been distributed!
          </p>
        </div>
      )}
    </div>
  );
}
