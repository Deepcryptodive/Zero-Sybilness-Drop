# Zero Sybilness Drop 
## an ETHLisbon (ETHGlobal) hack

### Summary 
Zero Sybilness Drop provides an innovative token claim contract, where only users verified as unique humans can claim an airdrop. This verification is conducted in a privacy-preserving manner using zk proofs facilitated by Sismo. **The aim of the project is to mitigate the issue of Sybil attacks in token airdrops and liquidity mining programs**, enhancing fairness and preventing token concentration. The project does this by ensuring that each unique user can only claim tokens once, using an innovative verification system that recognizes unique human users across any address they own, **in a privacy-preserving manner**.

**As a showcase, the system facilitates an airdrop for users who hold Aave's GHO stablecoin token and are able to prove their unique human status.** The project has evolved from a simple request of Sismo Vault ownership to a complex multi-request scenario of Vault ownership combined with group memberships. These requests uphold user privacy, as no Ethereum address is ever shared during the flow. This privacy-preserving feature is made possible by the data aggregation offered by the Sismo Vault.

The smart contract, constructed on top of the Sismo ERC-721 zkDrop contract, modifies it to drop ERC-20 tokens to a verified user rather than minting an NFT. It includes an integrated mechanism to check if a user has already claimed the tokens, thereby preventing multiple claims.

Eligibility for the Zero Sybilness airdrop is determined by a meticulously compiled list of addresses, assembled using the Sismo Factory. This comprehensive platform facilitated the aggregation of Data Groups from a variety of identity-verified communities, spanning multiple chains. We included:
- Gitcoin Passport users
- Proof of Humanity users
- World ID users who have verified their identity on Lens
- Quadrata Passport holders
- Masa Green 2FA (aka Bot Killer) SBTs
- Proof of Existence users
- HumanCheck users
- Binance KYC'ed users (BABT holders)
- Anima “proof of personhood“ NFT holders
- Humanbound verified users

This aggregation exemplifies the breadth of unique human users that are recognized and eligible for the Zero Sybilness Drop across different chains including Optimism, Arbitrum, BSC and Polygon. As a testament to the project's commitment to fairness and accessibility, over 820,000 addresses are eligible for the showcase airdrop.

Users can claim their airdrop on the frontend by connecting their wallet, privately verifying their identity through Sismo Connect, and signing a transaction with their address. The interface provides real-time feedback about the state of the claim, such as whether the user is eligible, the claim is in progress, or the tokens have been successfully claimed.

The application is deployed on the Polygon Mumbai testnet, using Foundry, and uses the viem library to interact with this EVM blockchain. It leverages the Sismo Connect button from the Sismo Connect React library to streamline user interaction.

In conclusion, Zero Sybilness Drop demonstrates a practical application of privacy-preserving technologies and decentralized identity verification in promoting fairness in token distribution. It's a pioneering solution, illustrating the potential of blockchain technology when combined with stringent, privacy-aware verification processes.


## Repository
This repository showcases how to integrate Sismo Connect onchain, and allows you to test the integration locally as easily as possible.

Note: based on the ["Sismo Connect - Onchain Sample Project Repository"](https://github.com/sismo-core/sismo-connect-onchain-sample-project)



See actual hackathon submission for more info!



## Screenshots
![image](https://github.com/Deepcryptodive/Zero-Sybilness-Drop/assets/61325205/1d079fa6-4a27-439c-a843-86a97e7516d6)

Start:
![image](https://github.com/Deepcryptodive/Zero-Sybilness-Drop/assets/61325205/7cc0b588-1e1d-48db-9023-2ae93da09fa7)

Authentication in Sismo Vault (privacy-preserving):
![image](https://github.com/Deepcryptodive/Zero-Sybilness-Drop/assets/61325205/dc9f823b-6705-48a4-b0c5-148939f72624)

Claiming token airdrop into address of choice:
![image](https://github.com/Deepcryptodive/Zero-Sybilness-Drop/assets/61325205/bb155a34-5515-44ea-8739-dec946e53f0e)

Succesfull claim:
![image](https://github.com/Deepcryptodive/Zero-Sybilness-Drop/assets/61325205/5b4ac266-f972-4800-921c-d01faab19e56)

When trying to claim for the second time with the same account, or any other account that is under control of the same user (via their Sismo Vault):
![image](https://github.com/Deepcryptodive/Zero-Sybilness-Drop/assets/61325205/cd8de31c-ace6-49e4-8b13-1ffcafb63d83)


## Disclaimer
It's important to note that this project was conceived and brought to life within the constraints of a hackathon setting. It represents the result of a single individual's focused effort within a restricted time frame. Consequently, there's a host of potential refinements and enhancements that can further increase its effectiveness and adaptability. Here are a few examples:

- **Customizable ERC-20 Token Allocation**: A more granular approach could allow each user to receive a unique amount of ERC-20 tokens, based on factors like past on-chain activity or current token balances. This would be particularly useful for liquidity mining or other incentive programs that aim to reward users based on their (historical) deposits into a protocol. In essence, we envision a system where the claim amount can be configured based on actions taken in other dapps.

- **Dynamic Sismo Groups**: The use of more dynamic Sismo Groups, which can automatically update, could replace the fixed lists currently used for some of the eligible groups.

- **Refined Eligibility Criteria**: Adjustments to the Sismo Group parameters could refine the claimant pool. For instance, instead of allowing all Gitcoin Passport holders to claim, we could exclude those with a low Passport score.

- **Mainnet Deployment**: Future iterations of the project could involve deploying the contract on a mainnet, rather than a testnet.

- **Revamped Reward Distribution**: Updating the reward distribution method to use a transfer function from a specialized claim contract (which can be topped up with one or more ERC-20 tokens) could be more useful than the current mint function.

- **Lightweight Authentication**: Incorporating simpler proof mechanisms, such as proof of Twitter or Lens account ownership, could offer a more streamlined process for releasing funds.


In conclusion, while the Zero Sybilness Drop showcase is a fully functioning solution, it's important to view it as **a starting point**. The potential for future refinements and enhancements is vast, and I believe these changes could lead to an even more powerful tool for privacy-preserving, fair, and unique human verification in the decentralized ecosystem. As always, I welcome feedback and contributions from the community to aid in the project's evolution.

## Usage

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) >= 18.15.0 (Latest LTS version)
- [Yarn](https://classic.yarnpkg.com/en/docs/install)
- [Foundry](https://book.getfoundry.sh/)
- Metamask installed in your browser

### Clone the repository

```bash
# clone the repository
git clone https://github.com/Deepcryptodive/Zero-Sybilness-Drop
cd Zero-Sybilness-Drop
```

### Install dependencies

```bash
# install frontend / backend dependencies
yarn

# install contract dependencies with Forge
foundryup
forge install
```

Note: sometimes it is also needed to add ```yarn add nodemon next```

### Launch your local fork by forking Mumbai with Anvil

In a new terminal:

```bash
# start a local blockchain with mumbai fork
yarn anvil
# this triggers this anvil command behind the scene
# `anvil --fork-url https://rpc.ankr.com/polygon_mumbai`
```

### Start your local Next.js app

In a new terminal:

```bash
# this will start your Next.js app
# the frontend is available on http://localhost:3000/
# it deploys the contracts on the local blockchain
yarn dev
```

The frontend is now available on http://localhost:3000/ and the contracts have been deployed on your local blockchain.
You can now experiment the user flow by going to your local frontend http://localhost:3000/.
If you wish to see the frontend code, you can go to the src/pages folder. The contracts code is in the contracts folder.

### Be eligible for the airdrop

As you will see, the app showcase simple examples on how to create gated airdrops with Sismo Connect.
To be eligible for the airdrops, you just need to add your address in [`./config.ts`](./config.ts):

```ts
// Replace with your address to become eligible for the airdrops
export const yourAddress = ""; // <--- Replace with your address

...
```

After changing the config file, you don't need to restart the app nor restart anvil, just refresh the page on the frontend and you are good to go.

ℹ️ You will be able to mint each airdrop only once with the same eligible address. If you wish to test the airdrop flow multiple times, you will need to change your eligible address or manually deploy again the contracts with the following command:

```bash
# this will deploy the contracts again on your local fork
yarn deploy-local
```

### Important note

The interaction with the fork network can become quite unstable if you stop the yarn anvil command at some point or if you already use the sample app before.
If so:

- keep the local anvil node running,
- make sure to delete your activity tab for the fork network in Metamask by going to "Settings > Advanced > Clear activity tab data" when connected to the fork network.
- relaunch the anvil node and the application

### Run contract tests

sismoConnectVerifier contracts are currently deployed on Goerli and Mumbai.
You can find the deployed addresses [here](https://docs.sismo.io/sismo-docs/technical-documentation/sismo-101).
You can then run tests on a local fork network to test your contracts.

```bash
## Run fork tests with goerli
forge test --fork-url https://rpc.ankr.com/eth_goerli

## Run fork tests with mumbai
forge test --fork-url https://rpc.ankr.com/polygon_mumbai

# you can aslo use the rpc url you want by passing an environment variable
forge test --fork-url $RPC_URL
```
