# TipStream - Base Mini App

A seamless tip distribution platform built on Base with OnchainKit integration.

## Features

- **Creator Deposits**: Post creators deposit $10 USDC to enable tipping
- **One-Click Tips**: Users can tip $0.01 USDC with a single click
- **Auto-Distribution**: Tips are automatically sent to creators via X402 Protocol
- **Real-Time Counter**: Live tip counter with animations
- **Mobile-First**: Optimized for mobile devices
- **OnchainKit Integration**: Seamless wallet connection and identity management

## Tech Stack

- **Next.js 15** with App Router
- **OnchainKit** for wallet integration
- **Wagmi/Viem** for blockchain interactions
- **Tailwind CSS** for styling
- **TypeScript** for type safety
- **Base Network** for USDC transactions

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Add your OnchainKit API key from [Coinbase Developer Platform](https://portal.cdp.coinbase.com/)

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## How It Works

### For Creators
1. Connect your wallet
2. Deposit $10 USDC to create a tip session
3. Share your tip link with your audience
4. Receive tips automatically via X402 Protocol

### For Tippers
1. Connect your wallet
2. Click the tip button to send $0.01 USDC
3. Tips are instantly sent to the creator
4. Watch the real-time counter update

## Smart Contract Integration

The app integrates with the Base USDC contract:
- **Contract Address**: `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`
- **Network**: Base Mainnet
- **Decimals**: 6

## X402 Protocol

Tips are distributed using the X402 Protocol for instant, low-cost payments:
- Automatic payment processing
- Real-time settlement
- Low transaction fees
- Reliable delivery

## Development

### Project Structure
```
app/                 # Next.js App Router pages
├── layout.tsx      # Root layout with providers
├── page.tsx        # Main application page
├── providers.tsx   # OnchainKit and Wagmi providers
└── globals.css     # Global styles

components/         # React components
├── WalletConnection.tsx
├── CreatorDeposit.tsx
├── TipCounter.tsx
├── TipButton.tsx
└── RecentTips.tsx

lib/               # Utilities and constants
├── constants.ts   # Contract addresses and ABIs
├── types.ts       # TypeScript type definitions
└── utils.ts       # Helper functions
```

### Key Components

- **WalletConnection**: OnchainKit wallet integration
- **CreatorDeposit**: USDC deposit functionality
- **TipButton**: One-click tipping interface
- **TipCounter**: Real-time tip counter with animations
- **RecentTips**: Live feed of recent tips

## Deployment

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**:
   ```bash
   npx vercel
   ```

3. **Set environment variables** in your deployment platform

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
- `NEXT_PUBLIC_BASE_RPC_URL`: Base network RPC URL (optional)
- `X402_API_KEY`: X402 Protocol API key (for production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Create an issue on GitHub
- Join our Discord community
- Check the OnchainKit documentation

---

Built with ❤️ on Base
