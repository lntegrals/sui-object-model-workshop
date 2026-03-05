import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import keyPairJson from "../keypair.json" with { type: "json" };
import { SuiGrpcClient } from "@mysten/sui";

const keypair = Ed25519Keypair.fromSecretKey(keyPairJson.privateKey);
const suiAddress = keypair.getPublicKey().toSuiAddress();

const suiClient = new SuiGrpcClient({
  network: 'testnet',
  baseUrl: 'https://fullnode.testnet.sui.io:443',
});

async function main() {
  const balance = await suiClient.getBalance({
    owner: suiAddress,
  });
  console.log("Address:", suiAddress);
  console.log("Balance:", balance.totalBalance, "MIST");
  console.log("Coin Type:", balance.coinType);
}

main();
