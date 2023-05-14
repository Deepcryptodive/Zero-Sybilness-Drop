# Zk Sybilness Drop - a ETHLisbon (ETHGlobal) hack

This repository provides a showcase on how to integrate Sismo Connect onchain, while allowing you to test the integration locally as easily as possible.

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
