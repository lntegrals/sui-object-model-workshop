const { Ed25519Keypair, Transaction, JsonRpcProvider } = require('@mysten/sui');
const keyPairJson = require('../keypair.json');

const keypair = Ed25519Keypair.fromSecretKey(keyPairJson.privateKey);
const suiAddress = keypair.getPublicKey().toSuiAddress();
const PACKAGE_ID = '0x57e029acbe322c733c1936ccba3642f27d0525c3883cf4e2742053ba2c5490b0';

const provider = new JsonRpcProvider('https://fullnode.testnet.sui.io:443');

async function main() {
  const tx = new Transaction();
  const nft = tx.moveCall({ target: `${PACKAGE_ID}::sui_nft::new` });
  tx.transferObjects([nft], suiAddress);
  
  const result = await provider.signAndExecuteTransaction({ transaction: tx, signer: keypair });
  console.log('Success!', result.digest);
}

main();
