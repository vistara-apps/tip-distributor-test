export interface TipSession {
  id: string;
  creatorAddress: string;
  depositAmount: bigint;
  remainingTips: number;
  totalTips: number;
  isActive: boolean;
  createdAt: Date;
}

export interface TipEvent {
  id: string;
  sessionId: string;
  tipperAddress: string;
  amount: bigint;
  timestamp: Date;
  txHash: string;
}

export interface X402Payment {
  recipient: string;
  amount: string;
  currency: 'USDC';
  network: 'base';
  metadata?: {
    sessionId: string;
    tipId: string;
  };
}
