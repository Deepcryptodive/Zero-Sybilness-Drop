import router from "next/router";
import { useEffect, useState } from "react";
import {
  switchNetwork,
  mumbaiFork,
  requestAccounts,
  getPublicClient,
  handleVerifyErrors,
  callContract,
  signMessage,
} from "@/utils";
import { transactions } from "../../broadcast/AirdropLevel2.s.sol/5151110/run-latest.json";
import { abi } from "../../abi/AirdropLevel2.json";
import { createWalletClient, http, custom, WalletClient, PublicClient } from "viem";
import BackButton from "../components/BackButton";
import {
  SismoConnectButton,
  SismoConnectClientConfig,
  AuthType,
} from "@sismo-core/sismo-connect-react";
import { devGroups } from "../../config";

export enum APP_STATES {
  init,
  receivedProof,
  claimingNFT,
}

// The application calls contracts on Mumbai testnet
const userChain = mumbaiFork;
const contractAddress = transactions[0].contractAddress;

// with your Sismo Connect app ID and enable dev mode.
// you can create a new Sismo Connect app at https://factory.sismo.io
// The SismoConnectClientConfig is a configuration needed to connect to Sismo Connect and requests data from your users.
// You can find more information about the configuration here: https://docs.sismo.io/build-with-sismo-connect/technical-documentation/react

export const sismoConnectConfig: SismoConnectClientConfig = {
  appId: "0x6aa6b65b0f51e64729bc06022e76127b", //added custom appId
  devMode: {
    enabled: true,
    devGroups,
  },
};

export default function ClaimAirdrop() {
  const [appState, setAppState] = useState<APP_STATES>(APP_STATES.init);
  const [responseBytes, setResponseBytes] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [tokenId, setTokenId] = useState<{ id: string }>();
  const [account, setAccount] = useState<`0x${string}`>(
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  );
  const [isAirdropAddressKnown, setIsAirdropAddressKnown] = useState<boolean>(false);
  const [walletClient, setWalletClient] = useState<WalletClient>(
    createWalletClient({
      chain: userChain,
      transport: http(),
    }) as WalletClient
  );
  const publicClient: PublicClient = getPublicClient(userChain);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setWalletClient(
      createWalletClient({
        chain: userChain,
        transport: custom(window.ethereum, {
          key: "windowProvider",
        }),
      }) as WalletClient
    );

    setIsAirdropAddressKnown(localStorage.getItem("airdropAddress") ? true : false);
    if (isAirdropAddressKnown) {
      setAccount(localStorage.getItem("airdropAddress") as `0x${string}`);
    }
  }, [isAirdropAddressKnown]);

  async function connectWallet() {
    router.push("/level-2-claim-airdrop");
    const address = await requestAccounts();
    localStorage.setItem("airdropAddress", address);
    setAccount(address);
    setIsAirdropAddressKnown(true);
  }

  function setResponse(responseBytes: string) {
    setResponseBytes(responseBytes);
    if (appState !== 2) {
      setAppState(APP_STATES.receivedProof);
    }
  }

  // This function is called when the user claims the NFT
  // It is called with the responseBytes returned by the Sismo Vault
  // The responseBytes is a string that contains plenty of information about the user proofs and additional parameters that should hold with respect to the proofs
  // You can learn more about the responseBytes format here: https://docs.sismo.io/build-with-sismo-connect/technical-documentation/client#getresponsebytes
  async function claimWithSismo(responseBytes: string) {
    setAppState(APP_STATES.claimingNFT);
    // switch the network
    await switchNetwork(userChain);
    try {
      const tokenId = await callContract({
        contractAddress,
        responseBytes,
        abi,
        userChain,
        account,
        publicClient,
        walletClient,
      });
      // If the proof is valid, we update the user react state to show the tokenId
      setTokenId({ id: tokenId });
    } catch (e) {
      setError(handleVerifyErrors(e));
    } finally {
      setAppState(APP_STATES.init);
      localStorage.removeItem("airdropAddress");
    }
  }

  return (
    <>
      <BackButton />
      <div className="container">
        {!tokenId && (
          <>
            <h1 style={{ marginBottom: 10 }}>
              Claim a gated Fairdrop <br /> for unique humans
            </h1>
            <h2>
             that are holding GHO stablecoins
            </h2>
            {!isAirdropAddressKnown && (
              <p style={{ marginBottom: 40 }}>
                Chose on which address you want to receive the airdrop and sign it with Sismo
                Connect
              </p>
            )}

            {isAirdropAddressKnown ? (
              <p style={{ marginBottom: 40 }}>You will receive the tokens on {account}</p>
            ) : (
              !error && (
                <button className="connect-wallet-button" onClick={() => connectWallet()}>
                  Connect Receiving Wallet
                </button>
              )
            )}

            {
              // This is the Sismo Connect button that will be used to create the requests and redirect the user to the Sismo Vault app to generate the proofs from his data
              // The different props are:
              // - config: the Sismo Connect client config that contains the Sismo Connect appId
              // - auths: the auth requests that will be used to generate the proofs, here we only use the Vault auth request
              // - signature: the signature request that will be used to sign an arbitrary message that will be checked onchain, here it is used to sign the airdrop address
              // - onResponseBytes: the callback that will be called when the user is redirected back from the his Sismo Vault to the Sismo Connect App with the Sismo Connect response as bytes
              // You can see more information about the Sismo Connect button in the Sismo Connect documentation: https://docs.sismo.io/build-with-sismo-connect/technical-documentation/react
            }
            {!error &&
              isAirdropAddressKnown &&
              appState != APP_STATES.receivedProof &&
              appState != APP_STATES.claimingNFT && (
                <SismoConnectButton
                  // the client config created
                  config={sismoConnectConfig}
                  // the auth request we want to make
                  // here we want the proof of a Sismo Vault ownership from our users
                  auth={{ authType: AuthType.VAULT }}
                  claims={[{ groupId: devGroups[0].groupId }, { groupId: devGroups[1].groupId }]}
                  // we use the AbiCoder to encode the data we want to sign
                  // by encoding it we will be able to decode it on chain
                  signature={{ message: signMessage(account) }}
                  // onResponseBytes calls a 'setResponse' function with the responseBytes returned by the Sismo Vault
                  onResponseBytes={(responseBytes: string) => setResponse(responseBytes)}
                  // Some text to display on the button
                  text={"Claim with Sismo"}
                />
              )}

            {/** Simple button to call the smart contract with the response as bytes */}
            {appState == APP_STATES.receivedProof && (
              <button
              style={{ padding: "20px", fontSize: "20px", width: "100%", height: "100%"}}
                className="connect-wallet-button"
                onClick={async () => {
                  await claimWithSismo(responseBytes);
                }}
                value="Claim Fairdrop"
              >
                {" "}
                Congrats you are eligible! Claim now!{" "}
              </button>
            )}
            {appState == APP_STATES.claimingNFT && (
              <p style={{ marginBottom: 40 }}>Claiming tokens...</p>
            )}
          </>
        )}

        {tokenId && (
          <>
            <h1>Fairdrop claimed!</h1>
            <p style={{ marginBottom: 20 }}>
              The verified user has chosen an address to receive the token airdrop
            </p>
            <div className="profile-container">
              <div>
                <h2>Tokens Claimed</h2>
                <b>Claimed amount: 100</b>
                {/* //TO DO: FIX with actual amount
                  For that, will have to define the
                  which is being returned by the smart contract
                  {tokenId?.amount}
                  WOuld also be good to show the tokenID with:
                  {tokenId?.id}
                  */}
                <p>Receiving address: {account}</p>
              </div>
            {
              /* Outdated code (we are not claiming NFTs anymore)
            <div className="profile-container">
              <div>
                <h2>NFT Claimed</h2>
                <b>tokenId: {tokenId?.id}</b>
                <p>Address used: {account}</p>
              </div>*/
            }
            </div>
          </>
        )}

        {error && (
          <>
            <h2>{error}</h2>
          </>
        )}
      </div>
    </>
  );
}
