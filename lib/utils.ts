import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatUSDC(amount: bigint): string {
  return (Number(amount) / 1000000).toFixed(2);
}

export function parseUSDC(amount: string): bigint {
  return BigInt(Math.floor(parseFloat(amount) * 1000000));
}

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function generateSessionId(): string {
  return `tip_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export async function sendX402Payment(payment: {
  recipient: string;
  amount: string;
  sessionId: string;
}): Promise<boolean> {
  try {
    // Simulate X402 payment processing
    console.log('Processing X402 payment:', payment);
    
    // In a real implementation, this would call the X402 API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error('X402 payment failed:', error);
    return false;
  }
}
