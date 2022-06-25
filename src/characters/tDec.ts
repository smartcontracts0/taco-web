import {
  EncryptedTreasureMap,
  PublicKey,
  SecretKey,
} from '@nucypher/nucypher-core';

import { fromHexString } from '../utils';

import { Enrico } from './enrico';
import { tDecDecrypter } from './universal_bob';

const tDecConfig: { [key: string]: { [key: string]: any } } = {
  simple: {
    policyEncryptingKey: PublicKey.fromBytes(
      fromHexString(
        '035f0cd5d45810c561828357d70483691805351ecb008f3fe1180a167ac39efc49'
      )
    ),
    encryptedTreasureMap: EncryptedTreasureMap.fromBytes(
      fromHexString(
        '454d61700001000092c46202ef932d5cf380ab95a87aac185d21fdaf92c9bbcb4feb5d58877e5c953c9cb5c90388364078d3e809dd451a8d3c54452563d40ec411e4939ddf2499d75b3fd82b4b02d733f2305603302a1bbcc7a8a9389f0b919fcfe6b9e76b261b1c6a7d808d2dc502c6fe95cd1c5a5d6056a814096aeff5aaf82692344686a22659a1cea340fb4406a72a579c7212b2b56ec1ea78819c0b15099e7797e77f134630141bba39f2989f2c9c8cd3a73ee5b4821ccb5dfe4ddbe0cc211b0e22bc36633197e1f7c4dda0c6de9fb161b44c0da35d3c8f7fe71cf8728e2c1f3a2bc4dcb3dd9ed5f5d9a51c975590d3fcfb5941cf70b888b2feff4d35e9b322ed1ad856edc7e67472dd777c9a38d0929eae165056b3ac61ca136fbf823d221408fc727fed5caac0c75e0868614dc21d73a3b42b30324f58a57a0db677a3d4def01b15b23d91ada229cdaabf45402eb795dd7816ab49a21cd17cbb30e1a9c5c01fc7503d9359fb39ad474cde86a2d72ec0ac671e6ca6e11436e88dbe7de33e45028f424f2c964c7d4bced29ead8bc25bb71f8b8d1d841e671652fa77b02d55348757c35317a2207cd8fe7baf85a0b5ca2fdcc5cfdc9218b495235fd3524547b59e271a1c2af7fee4b4333831c02b81ee70c10fe8fea06f05a9e6149569491a5cd5ab037a85f52eef2b24080571fb846d8c10780177c1871be72506ed2dbf9f4b20835f896c32f9e135dd2a99dd21402c89e9ae786e76a530d441b641a17a2ec549cdc749f00eef492cd84f4e7f2006f8f3370862dc7a53ab341ec6e8800d7db5059e5b02e549e160d796fec5577b58731ce69ccf25f706a60e9b8b7c16047a43e3fcf6583e3a071d48ac8d630ea30a5412dc5df1d0046f7396ea389b5066077a5708b0f915ead6bc0020fe95deeb3fe5583a21bd4b1277d94d242bdd7d9b5f6f36d4940c5b2541f26a18ec7b7ebac380ae9c9218f81d98d2dde13d28ede88adec49eda24f2f76abd2237ccde33a5f9b80bbae0f0792122e680b57a6778b0def4179045e8f76d2f3412f22a86c25040bd52cae18cd4f1fc8ed5c7377b09fc7ec5cdf649ef4126c33176ed78e4c81feaa017914d1c0eb9519d1db77516abe0aba7766d9a4f342d36c7260e3478872feb202dff7bcd'
      )
    ),
    publisherVerifyingKey: PublicKey.fromBytes(
      fromHexString(
        '026de79df36f0a412173c4dd58e30996e74fffe08dff00a00a7d42bc7c566dec6c'
      )
    ),
    decryptingKey: SecretKey.fromBytes(
      fromHexString(
        '44a60442bfb3753e2c3d2ae13e12a3af8aa0d398b1c9dd7dd76f9caa44a0d719'
      )
    ),
  },
};

export const makeTDecDecrypter = (
  configLabel: string,
  porterUri: string
): tDecDecrypter => {
  return new tDecDecrypter(
    porterUri,
    tDecConfig[configLabel]['policyEncryptingKey'],
    tDecConfig[configLabel]['encryptedTreasureMapy'],
    tDecConfig[configLabel]['publisherVerifyingKey'],
    tDecConfig[configLabel]['decryptingKey']
  );
};

export const makeTDecEncrypter = (configLabel: string): Enrico => {
  return new Enrico(
    tDecConfig[configLabel]['policyEncryptingKey'],
    tDecConfig[configLabel]['publisherVerifyingKey']
  );
};