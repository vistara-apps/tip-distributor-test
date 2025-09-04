'use client';

import { useState } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits } from 'viem';
import { USDC_CONTRACT_ADDRESS, USDC_ABI, DEPOSIT_AMOUNT } from '@/lib/constants';
import { Wallet2, DollarSign, CheckCircle, Loader2 } from 'lucide-react';

interface CreatorDepositProps {
  onDepositSuccess: (sessionId: string) => void;
  isDeposited: boolean;
}

export function CreatorDeposit({ onDepositSuccess, isDeposited }: CreatorDepositProps) {
  const { address, isConnected } = useAccount();
  const [isDepositing, setIsDepositing] = useState(false);
  
  const { writeContract, data: hash, isPending } = useWriteContract();
  
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleDeposit = async () => {
    if (!isConnected || !address) return;
    
    setIsDepositing(true);
    
    try {
      // In a real implementation, you would transfer to a smart contract
      // For demo purposes, we'll simulate the deposit
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      onDepositSuccess(sessionId);
      
    } catch (error) {
      console.error('Deposit failed:', error);
    } finally {
      setIsDepositing(false);
    }
  };

  if (isDeposited) {
    return (
      <div className="card text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <h2 className="text-2xl font-bold text-gray-800">Deposit Complete</h2>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-800 font-medium">
            ✅ $10 USDC deposited successfully!
          </p>
          <p className="text-green-600 text-sm mt-1">
            Your tip session is now active. Users can start tipping!
          </p>
        </div>
        
        <div className="text-sm text-gray-600">
          <p>1,000 tips available at $0.01 each</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card text-center space-y-6">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Wallet2 className="w-8 h-8 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">Creator Deposit</h2>
      </div>
      
      <div className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <span className="text-2xl font-bold text-blue-800">$10 USDC</span>
          </div>
          <p className="text-blue-600 text-sm">
            Deposit to enable 1,000 tips at $0.01 each
          </p>
        </div>
        
        <div className="text-left space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Tip Amount:</span>
            <span className="font-medium">$0.01 USDC</span>
          </div>
          <div className="flex justify-between">
            <span>Total Tips:</span>
            <span className="font-medium">1,000</span>
          </div>
          <div className="flex justify-between">
            <span>Auto-distribution:</span>
            <span className="font-medium text-green-600">X402 Protocol</span>
          </div>
        </div>
        
        <button
          onClick={handleDeposit}
          disabled={!isConnected || isDepositing}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isDepositing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing Deposit...
            </>
          ) : (
            <>
              <DollarSign className="w-5 h-5" />
              Deposit $10 USDC
            </>
          )}
        </button>
        
        {!isConnected && (
          <p className="text-sm text-gray-500">
            Connect your wallet to deposit
          </p>
        )}
      </div>
    </div>
  );
}
