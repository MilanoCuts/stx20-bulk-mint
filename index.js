const {
  makeSTXTokenTransfer,
  broadcastTransaction,
  getAddressFromPrivateKey,
  getNonce,
} = require("@stacks/transactions");
const { StacksMainnet } = require("@stacks/network");
require("dotenv").config();

const main = async () => {
  const {
    AMOUNT_OF_TRANSCATIONS,
    TOKEN_TICKER,
    TOKEN_AMOUNT,
    FEE_STX,
    SENDER_WALLET_PRIVATE_KEY,
    RECEIVER_WALLET_ADDRESS,
  } = process.env;

  const network = new StacksMainnet();
  const senderAddress = getAddressFromPrivateKey(
    SENDER_WALLET_PRIVATE_KEY,
    network.version
  );

  let nonce = await getNonce(senderAddress, network);

  const fee = FEE_STX ? BigInt(parseFloat(FEE_STX) * 1000000) : BigInt(750000);

  for (let i = 0; i < parseInt(AMOUNT_OF_TRANSCATIONS); i++) {
    const txOptions = {
      recipient: RECEIVER_WALLET_ADDRESS,
      amount: BigInt(1),
      senderKey: SENDER_WALLET_PRIVATE_KEY,
      network,
      memo: `m${TOKEN_TICKER}${TOKEN_AMOUNT}`,
      fee: fee,
      nonce: nonce,
    };

    const transaction = await makeSTXTokenTransfer(txOptions);
    const broadcastResponse = await broadcastTransaction(transaction, network);

    if (broadcastResponse.error) {
      console.error(`Error in transaction ${i + 1}`, broadcastResponse);
    } else {
      console.log(`Transaction ${i + 1} sent:`, broadcastResponse);
    }

    nonce++;

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

main().catch(console.error);
