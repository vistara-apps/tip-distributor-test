'use client';

import { ConnectWallet, Wallet, WalletDropdown } from '@coinbase/onchainkit/wallet';
import { Name, Avatar, Address } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';

export function WalletConnection() {
  const { isConnected } = useAccount();

  return (
    <div className="flex justify-center mb-8">
      <Wallet>
        <ConnectWallet className="btn-primary">
          {isConnected ? (
            <div className="flex items-center gap-3">
              <Avatar className="w-6 h-6" />
              <Name className="font-semibold" />
            </div>
          ) : (
            <span>Connect Wallet</span>
          )}
        </ConnectWallet>
        <WalletDropdown>
          <div className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8" />
              <div>
                <Name className="font-semibold text-sm" />
                <Address className="text-xs text-gray-500" />
              </div>
            </div>
          </div>
        </WalletDropdown>
      </Wallet>
    </div>
  );
}
