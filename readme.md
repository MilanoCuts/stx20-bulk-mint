# STX20 Bulk Minter

This project demonstrates how to generate a new cryptocurrency wallet and then use it to perform bulk transactions on the Stacks blockchain.

## Getting Started

These instructions will guide you through setting up your project environment and running the code to generate a wallet and perform transactions.

### Prerequisites

- Node.js installed on your system.
- Basic knowledge of using command line interfaces.

### Installation Instructions

1. **Install Dependencies**: Install the required Node.js packages:

```
   npm install
```

### Wallet Generation

Before you can run transactions, you need to generate a new wallet.

1. **Run the Wallet Generation Script**:

```
   node generate_wallet.js
```

This script will generate a new wallet and save its details, including the private key, in a JSON file within a `wallets` directory.

2. **Locate Your Wallet Details**: Find the generated JSON file in the `wallets` directory. It contains your wallet's private key and address.

### Configuration

Set up your environment variables to use the wallet for transactions.

1. **Create a `.env` File**: Copy the `.env.example` file to a new file named `.env`:

```
   cp .env.example .env
```

2. **Edit the `.env` File**: Open the `.env` file in a text editor. Replace the placeholder values with your actual wallet details:

   - `SENDER_WALLET_PRIVATE_KEY`: Use the private key from your generated wallet.
   - `RECEIVER_WALLET_ADDRESS`: Set the address to which you want to send the transaction.

Example:

```
AMOUNT_OF_TRANSCATIONS=2
TOKEN_TICKER=MUNE
TOKEN_AMOUNT=5000
FEE_STX=0.75
SENDER_WALLET_PRIVATE_KEY=your_private_key_here
RECEIVER_WALLET_ADDRESS=receiver_address_here
```

### Running Transactions

Once the configuration is done, you can perform transactions.

1. **Execute the Transaction Script**:

```
node index.js
```

This script will perform the transactions as per the details specified in your `.env` file.

## Troubleshooting

If you encounter any issues, make sure that:

- Node.js is properly installed.
- All dependencies are installed (`npm install`).
- The `.env` file contains the correct wallet details.
