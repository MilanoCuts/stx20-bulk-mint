const {
  generateWallet,
  generateSecretKey,
  getStxAddress,
} = require("@stacks/wallet-sdk");
const { TransactionVersion } = require("@stacks/transactions");
const fs = require("fs");
const path = require("path");

async function generateAndSaveWallet() {
  const password = "MyStacksWallet123!"; // We don't use this
  const secretKey = generateSecretKey();

  const wallet = await generateWallet({
    secretKey,
    password,
  });

  const firstAccount = wallet.accounts[0];

  const mainnetAddress = getStxAddress({
    account: firstAccount,
    transactionVersion: TransactionVersion.Mainnet,
  });

  const walletData = {
    seed: secretKey,
    password: password,
    privateKey: firstAccount.stxPrivateKey,
    address: mainnetAddress,
  };

  const walletsDir = path.join(__dirname, "wallets");
  if (!fs.existsSync(walletsDir)) {
    fs.mkdirSync(walletsDir);
  }

  const filePath = path.join(walletsDir, `${mainnetAddress}.json`);
  fs.writeFileSync(filePath, JSON.stringify(walletData, null, 2));

  console.log(`Wallet details saved in ${filePath}`);
}

generateAndSaveWallet().catch(console.error);
