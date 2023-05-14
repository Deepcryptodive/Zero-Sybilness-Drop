import { Chain, createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

///////////////////

// Replace with your address to become eligible for the airdrops
export const yourAddress = "0xca4aD39F872E89Ef23eABd5716363Fc22513E147";

///////////////////

export const devGroups = [
  {
    // verified-human group: https://github.com/sismo-core/sismo-hub/blob/main/group-generators/generators/verified-human/index.ts
    groupId: "0x349d8bd135bd903a633464f9b303c902",
    data: [
      // your address is added here so you can test the airdrops
      yourAddress,
      "0x2b9b9846d7298e0272c61669a54f0e602aba6290",
      "0xb01ee322c4f028b8a6bfcd2a5d48107dc5bc99ec",
      "0x938f169352008d35e065F153be53b3D3C07Bcd90",
    ],
  },
  {
    // GHO holders Goerli group: https://github.com/sismo-core/sismo-hub/blob/main/group-generators/generators/gho-holders-goerli/index.ts
    groupId: "0xc6ae11a89cc5cf7a34dac84c7d7b8eff",
    data: [
      // your address is added here so you can test the airdrops
      yourAddress,
      "0x2b9b9846d7298e0272c61669a54f0e602aba6290",
      "0xb01ee322c4f028b8a6bfcd2a5d48107dc5bc99ec",
      "0x938f169352008d35e065F153be53b3D3C07Bcd90",
    ],
  },
];

// The chain configuration of the chain you want to fork
// You don't need to change this
export const mumbaiFork = {
  id: 5151110,
  name: "Fork Mumbai - Sismo",
  network: "forkMumbaiSismo",
  nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["http://127.0.0.1:8545"],
    },
    public: {
      http: ["http://127.0.0.1:8545"],
    },
  },
} as const satisfies Chain;

// The private key of the second account of the local anvil network
// This account is used for this demo to allow the user to try it without connecting a wallet
export const account = privateKeyToAccount(
  "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"
);

// setup the public and wallet client to interact with the contract deployed on a local fork
// the public client is used to read data from the contract or the chain
// the wallet client is used to send transactions to the contract
export const publicClient = createPublicClient({
  chain: mumbaiFork,
  transport: http("http://127.0.0.1:8545"),
});
