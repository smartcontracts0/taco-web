import { format } from 'node:util';

import {
  conditions,
  decrypt,
  domains,
  encrypt,
  fromBytes,
  getPorterUri,
  initialize,
  isAuthorized,
  ThresholdMessageKit,
  toBytes,
  toHexString,
} from '@nucypher/taco';
import * as dotenv from 'dotenv';
import { ethers } from 'ethers';

dotenv.config();

const rpcProviderUrl = process.env.RPC_PROVIDER_URL;
if (!rpcProviderUrl) {
  throw new Error('RPC_PROVIDER_URL is not set.');
}

const encryptorPrivateKey = process.env.ENCRYPTOR_PRIVATE_KEY;
if (!encryptorPrivateKey) {
  throw new Error('ENCRYPTOR_PRIVATE_KEY is not set.');
}

const consumerPrivateKey = process.env.CONSUMER_PRIVATE_KEY;
if (!consumerPrivateKey) {
  throw new Error('CONSUMER_PRIVATE_KEY is not set.');
}

const domain = process.env.DOMAIN || domains.TESTNET;
const ritualId = parseInt(process.env.RITUAL_ID || '0');
const provider = new ethers.providers.JsonRpcProvider(rpcProviderUrl);
const CHAIN_ID_FOR_DOMAIN = {
  [domains.MAINNET]: 137,
  [domains.TESTNET]: 80002,
  [domains.DEVNET]: 80002,
};
const chainId = CHAIN_ID_FOR_DOMAIN[domain];

console.log('Domain:', domain);
console.log('Ritual ID:', ritualId);
console.log('Chain ID:', chainId);

const encryptToBytes = async (messageString: string) => {
  const encryptorSigner = new ethers.Wallet(encryptorPrivateKey);
  console.log(
    'Encryptor signer\'s address:',
    await encryptorSigner.getAddress(),
  );

  const message = toBytes(messageString);
  console.log(format('Encrypting message ("%s") ...', messageString));

  const ownsToken = new conditions.base.contract.ContractCondition({
    chain: 80002,
    method: 'balanceOf',
    parameters: [':userAddress'],
    standardContractType: 'ERC20',
    contractAddress: '0xa10EaE4CB345A4E265f8f92829fE13E89D82023c',
    returnValueTest: {
      comparator: '==',
      value: 1000000000000000000, //This uses uint256, so the number is multiplied with 10^18
    },
  });

  

  console.assert(
    ownsToken.requiresSigner(),
    'Condition requires signer',
  );

  const messageKit = await encrypt(
    provider,
    domain,
    message,
    ownsToken,
    ritualId,
    encryptorSigner,
  );

  // Note: Not actually needed but used by CI for checking contract compatibility.
  // Calling it after the encryption because we need material from messageKit.
  const isEncryptorAuthenticated = await isAuthorized(
    provider,
    domain,
    messageKit,
    ritualId,
  );
  if (!isEncryptorAuthenticated) {
    throw new Error('Not authorized');
  }

  return messageKit.toBytes();
};

const decryptFromBytes = async (encryptedBytes: Uint8Array) => {
  const consumerSigner = new ethers.Wallet(consumerPrivateKey);
  console.log(
    '\nConsumer signer\'s address:',
    await consumerSigner.getAddress(),
  );

  const messageKit = ThresholdMessageKit.fromBytes(encryptedBytes);
  console.log('Decrypting message ...');
  return decrypt(
    provider,
    domain,
    messageKit,
    getPorterUri(domain),
    consumerSigner,
  );
};

const runExample = async () => {
  // Make sure the provider is connected to the correct network
  const network = await provider.getNetwork();
  if (network.chainId !== chainId) {
    throw (`Please connect your provider to an appropriate network ${chainId}`);
  }
  await initialize();

  const messageString = '@SRR396636.sra.1 HWI-EAS137R_0379:1:1:11336:1079 length=100 CAGCCGCTGGGTCCGCGCGACCGGCTGGTGCTGGGGCAGGTCGGGGGGGAGCAGATCCGGCTCGGCCTGCCGCCCGGCCGGTGCACGCCGTCGCGCGGGC +SRR396636.sra.1 HWI-EAS137R_0379:1:1:11336:1079 length=100';
  const encryptedBytes = await encryptToBytes(messageString);
  console.log('Ciphertext: ', toHexString(encryptedBytes));

  const decryptedBytes = await decryptFromBytes(encryptedBytes);
  const decryptedMessageString = fromBytes(decryptedBytes);
  console.log('Decrypted message:', decryptedMessageString);

  console.assert(
    decryptedMessageString === messageString,
    'Decrypted message is different to original message',
  );
};

runExample().then(() => {
  console.log('Example finished');
});
