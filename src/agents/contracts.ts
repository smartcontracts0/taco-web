import { ChainId, ChecksumAddress } from '../types';

type Contracts = {
  readonly SUBSCRIPTION_MANAGER: ChecksumAddress | undefined;
  readonly COORDINATOR: ChecksumAddress | undefined;
};

const POLYGON: Contracts = {
  SUBSCRIPTION_MANAGER: '0xB0194073421192F6Cf38d72c791Be8729721A0b3',
  COORDINATOR: undefined,
};

const MUMBAI: Contracts = {
  SUBSCRIPTION_MANAGER: '0xb9015d7b35ce7c81dde38ef7136baa3b1044f313',
  COORDINATOR: undefined,
};

const GOERLI: Contracts = {
  SUBSCRIPTION_MANAGER: undefined,
  COORDINATOR: '0x2cf19429168a0943992D8e7dE534E9b802C687B6',
};

const CONTRACTS: { readonly [key in ChainId]: Contracts } = {
  [ChainId.POLYGON]: POLYGON,
  [ChainId.MUMBAI]: MUMBAI,
  [ChainId.GOERLI]: GOERLI,
};

export const getContract = (
  chainId: number,
  contract: keyof Contracts
): ChecksumAddress => {
  if (!Object.values(ChainId).includes(chainId)) {
    throw new Error(`No contracts found for chainId: ${chainId}`);
  }
  if (!Object.keys(CONTRACTS[chainId as ChainId]).includes(contract)) {
    throw new Error(`No contract found for name: ${contract}`);
  }
  const address = CONTRACTS[chainId as ChainId][contract];
  if (!address) {
    throw new Error(`No address found for contract: ${contract}`);
  }
  return address;
};

export const DEFAULT_WAIT_N_CONFIRMATIONS = 1;
