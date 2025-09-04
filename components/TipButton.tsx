'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { Heart, Loader2, Zap } from 'lucide-react';
import { sendX402Payment } from '@/lib/utils';

interface TipButtonProps {
  sessionId: string;
  creatorAddress: string;
  remainingTips: number;
  onTipSuccess: () => void;
  isActive: boolean;
}

export function TipButton({ 
  sessionId, 
  creatorAddress, 
  remainingTips, 
  onTipSuccess, 
  isActive 
}: TipButtonProps) {
  const { address, isConnected } = useAccount();
  const [isTipping, setIsTipping] = useState(false);
  const [lastTipTime, setLastTipTime] = useState<number>(0);

  const handleTip = async () => {
    if (!isConnected || !address || remainingTips <= 0 || !isActive) return;
    
    // Prevent spam clicking (1 second cooldown)
    const now = Date.now();
    if (now - lastTipTime < 1000) return;
    
    setIsTipping(true);
    setLastTipTime(now);
    
    try {
      // Simulate tip processing with X402
      const payment = {
        recipient: creatorAddress,
        amount: '0.01',
        sessionId: sessionId,
      };
      
      const success = await sendX402Payment(payment);
      
      if (success) {
        onTipSuccess();
        
        // Show success animation
        setTimeout(() => {
          setIsTipping(false);
        }, 600);
      } else {
        throw new Error('Payment failed');
      }
      
    } catch (error) {
      console.error('Tip failed:', error);
      setIsTipping(false);
    }
  };

  const canTip = isConnected && isActive && remainingTips > 0;

  return (
    <div className="card text-center space-y-6">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Heart className="w-8 h-8 text-red-500" />
        <h2 className="text-2xl font-bold text-gray-800">Send a Tip</h2>
      </div>
      
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-pink-50 to-red-50 border border-pink-200 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="text-2xl font-bold text-gray-800">$0.01 USDC</span>
          </div>
          <p className="text-gray-600 text-sm">
            One-click tip via X402 Protocol
          </p>
        </div>
        
        <button
          onClick={handleTip}
          disabled={!canTip || isTipping}
          className={`tip-button w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 ${
            isTipping ? 'animate-tip' : ''
          }`}
        >
          {isTipping ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Sending Tip...
            </>
          ) : (
            <>
              <Heart className="w-6 h-6" />
              Tip Creator
            </>
          )}
        </button>
        
        <div className="text-sm text-gray-600 space-y-1">
          {!isConnected && (
            <p>Connect your wallet to tip</p>
          )}
          {isConnected && !isActive && (
            <p>Tip session not active</p>
          )}
          {isConnected && isActive && remainingTips <= 0 && (
            <p>No tips remaining</p>
          )}
          {isConnected && isActive && remainingTips > 0 && (
            <p>{remainingTips.toLocaleString()} tips remaining</p>
          )}
        </div>
      </div>
    </div>
  );
}
