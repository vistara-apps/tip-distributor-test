'use client';

import { useState, useCallback } from 'react';
import { useAccount } from 'wagmi';
import { WalletConnection } from '@/components/WalletConnection';
import { CreatorDeposit } from '@/components/CreatorDeposit';
import { TipCounter } from '@/components/TipCounter';
import { TipButton } from '@/components/TipButton';
import { RecentTips } from '@/components/RecentTips';
import { Sparkles, Zap } from 'lucide-react';

export default function HomePage() {
  const { address } = useAccount();
  const [sessionId, setSessionId] = useState<string>('');
  const [isDeposited, setIsDeposited] = useState(false);
  const [totalTips, setTotalTips] = useState(0);
  const [remainingTips, setRemainingTips] = useState(1000);
  const [tipAnimations, setTipAnimations] = useState(0);

  const handleDepositSuccess = useCallback((newSessionId: string) => {
    setSessionId(newSessionId);
    setIsDeposited(true);
  }, []);

  const handleTipSuccess = useCallback(() => {
    setTotalTips(prev => prev + 1);
    setRemainingTips(prev => Math.max(0, prev - 1));
  }, []);

  const handleTipAnimation = useCallback(() => {
    setTipAnimations(prev => prev + 1);
  }, []);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TipStream
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Seamless tip distribution on Base. Creators deposit $10 USDC, users tip $0.01 with one click.
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-gray-500">Powered by X402 Protocol</span>
          </div>
        </div>

        {/* Wallet Connection */}
        <WalletConnection />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column */}
          <div className="space-y-6">
            <CreatorDeposit 
              onDepositSuccess={handleDepositSuccess}
              isDeposited={isDeposited}
            />
            
            {isDeposited && (
              <TipButton
                sessionId={sessionId}
                creatorAddress={address || ''}
                remainingTips={remainingTips}
                onTipSuccess={handleTipSuccess}
                isActive={isDeposited}
              />
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <TipCounter
              totalTips={totalTips}
              remainingTips={remainingTips}
              isActive={isDeposited}
              onTipAnimation={handleTipAnimation}
            />
            
            <RecentTips totalTips={totalTips} />
          </div>
        </div>

        {/* Stats Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center shadow-lg border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">{totalTips}</div>
            <div className="text-sm text-gray-600">Total Tips</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-lg border border-gray-100">
            <div className="text-2xl font-bold text-green-600">
              ${(totalTips * 0.01).toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">USDC Distributed</div>
          </div>
          
          <div className="bg-white rounded-xl p-4 text-center shadow-lg border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">{remainingTips}</div>
            <div className="text-sm text-gray-600">Tips Remaining</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Built on Base • Powered by OnchainKit • X402 Protocol Integration
          </p>
        </div>
      </div>
    </div>
  );
}
