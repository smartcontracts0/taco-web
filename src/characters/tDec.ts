import {
  EncryptedTreasureMap,
  PublicKey,
  SecretKey,
} from '@nucypher/nucypher-core';

import { fromHexString } from '../utils';

import { Enrico } from './enrico';
import { tDecDecrypter } from './universal_bob';

const tDecConfig: { [key: string]: { [key: string]: any } } = {
  ibex_test: {
    policyEncryptingKey: PublicKey.fromBytes(
      fromHexString(
        '03a061abec02f3ffa2688a709a7499c666f871fccd39b021d3b36e266eeb0e4500'
      )
    ),
    encryptedTreasureMap: EncryptedTreasureMap.fromBytes(
      fromHexString(
        '454d61700001000092c46202446948cb03c87f1ba09fbac79cbfbc12be3891370f673363eb9f467fa5053a3f03a9967d951688a9a2354391b6a9971633aaf3900293131dc667ed52a6a796175901fdac5c7de1c4ad918485c304059418d54f1e905874442e9d10929e175ed0f5c502c620b4fa0f28a3477a56e90802a57e6129ec0ff4d2546b95b5b504cf88d85d1a2d5e6ccdb01172343196892d9392bd1718a276f657dae0a409e153d50d1ba17a7521b80c78e005fdc4125f5fe074af038725f5ac6607ad254eee75ec65d366632e6a6b438183afa1c59d00f15ca1c92ce22a9b7e46c64cde2edd3b13da49129c2dab4834bcc0ab7ee02d1e076da6e3a614d2a9562c12c3b183b40a44de311c4aa0269965b21b346fc0e071975a3a9c42347e5ddb579f6e98ee85d6bd5d2da1ffb90222f7efc96d770803a76275664dd924dd04bba8037f21b8d09cd717a0196173c12d04b9d4687ec814fb5563410a3312eb1783e9c01fa53c0e64936d4b94613ec97073971200dfba42ebfc8c473c08ef37ae0418f9f54b209d562010cfc5014ab72f5ff73574f5cb2775ec2c70043b1b28f6c96cd654bd4abac0d6f4fb1cd1c7a66498ed73705b37887e16f1d9cfb6a2c77ec589ba47cd8220ef1bf4b30ee8bd4842e92e44f2643abd8ee324e9ab272db46df76079312b67310788aefb345387a2aa7998f0eb314ebad13b338307c2e01aa23ba00ebaa162194448dbafd8d5b08f65645f098adf8c8a8c9139f45dc3d9ba2f5bed9319599571927ec81c5306b1213f79f7b852b34768ed6a8fa7caf33e456221a583d586426e8c18e963937fcb2bf4cf6c1add08568e6626ca20cc5356a9729448d077806026e214eba951166a6ae91932d5e696c6139a966b7c7974b8eaf69e087b0d6988e9ec3280c44340766cf3c7743961e94274349c198d3b58158b4f8382f165a26a7c3255e1d45998f95e4995498f7db897b8c95ef788ac0863e1f890b1914ce7cde7db51856c3e1e63b56a28434df1e407d29812b1fd1a6838068d39bbc777bdc515ad9c94cee7ddc5fbde490451d4f14f85ac811f0623341397048b0953fcde6cbfcf38b33b8aff476197a434b440285b0d0fbe248805d068cdeef04e5b557103d67bebc45f68f6e5ccc6fbf50747'
      )
    ),
    publisherVerifyingKey: PublicKey.fromBytes(
      fromHexString(
        '029c0273aa6a68f6aee6182b3fe274ab022d527fda915c1b4eade42212f51c4d26'
      )
    ),
    verifyingKey: SecretKey.fromBytes(
      fromHexString(
        '77956dd5f8c26681b1c87ed9af30eb3066d93d7277056e826f59b1a5f21ad0be'
      )
    ),
    decryptingKey: SecretKey.fromBytes(
      fromHexString(
        '073e656ca21122485b3a2b4102f668c70436d91bdf9a140f5ea3fb45dc33fa4f'
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
    tDecConfig[configLabel]['encryptedTreasureMap'],
    tDecConfig[configLabel]['publisherVerifyingKey'],
    tDecConfig[configLabel]['decryptingKey'],
    tDecConfig[configLabel]['verifyingKey']
  );
};

export const makeTDecEncrypter = (configLabel: string): Enrico => {
  return new Enrico(
    tDecConfig[configLabel]['policyEncryptingKey'],
    tDecConfig[configLabel]['publisherVerifyingKey']
  );
};
