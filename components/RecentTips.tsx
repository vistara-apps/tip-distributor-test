'use client';

import { useEffect, useState } from 'react';
import { Clock, Heart, ExternalLink } from 'lucide-react';
import { shortenAddress } from '@/lib/utils';

interface Tip {
  id: string;
  address: string;
  timestamp: Date;
  amount: string;
}

interface RecentTipsProps {
  totalTips: number;
}

export function RecentTips({ totalTips }: RecentTipsProps) {
  const [tips, setTips] = useState<Tip[]>([]);

  useEffect(() => {
    // Simulate adding new tips
    if (totalTips > tips.length) {
      const newTips: Tip[] = [];
      for (let i = tips.length; i < totalTips; i++) {
        newTips.push({
          id: `tip_${i}`,
          address: `0x${Math.random().toString(16).substr(2, 40)}`,
          timestamp: new Date(),
          amount: '0.01',
        });
      }
      setTips(prev => [...newTips, ...prev].slice(0, 10)); // Keep only last 10
    }
  }, [totalTips, tips.length]);

  if (tips.length === 0) {
    return (
      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-800">Recent Tips</h3>
        </div>
        
        <div className="text-center py-8 text-gray-500">
          <Heart className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No tips yet. Be the first to tip!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="w-6 h-6 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-800">Recent Tips</h3>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {tips.map((tip, index) => (
          <div 
            key={tip.id}
            className={`flex items-center justify-between p-3 rounded-lg border transition-all duration-300 ${
              index === 0 ? 'bg-green-50 border-green-200 animate-pulse-slow' : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-sm text-gray-800">
                  {shortenAddress(tip.address)}
                </p>
                <p className="text-xs text-gray-500">
                  {tip.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-bold text-green-600">
                ${tip.amount}
              </span>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
