// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

//This is an ERC20 contract that has added functionality to allow users to claim tokens if they are part of certain groups in Sismo Connect.

//NOTE: this was done badding ERC-20 airdrop functionality to the Sismo ERC-21 zkDrop contract
// It now results in ERC-20 tokens going to the verified user (instead of dropping an NFT).
// It also checks if the user already claimed or not

// import SismoConnect Solidity library
import "sismo-connect-solidity/SismoLib.sol";
import  {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title ZKDropERC721
 * @author Sismo
 * @notice ZkDropERC721 is a contract that allows users to privately claim and transfer ERC721 tokens using SismoConnect.
 */
contract AirdropLevel2 is
    ERC20,
    SismoConnect // the contract inherits from SismoConnect
{
    using SismoConnectHelper for SismoConnectVerifiedResult;
    // specify the groupIds from which users should be members of to claim the token
    bytes16 public immutable GROUP_ID;
    bytes16 public immutable GROUP_ID_2;

    //Not necessary anymore:
    //error RegularERC20TransferFromAreNotAllowed();
    //error RegularERC20SafeTransferFromAreNotAllowed();

    constructor(
        string memory name,
        string memory symbol,
        bytes16 appId, // the appId of your sismoConnect app (you need to register your sismoConnect app on https://factory.sismo.io)
        bytes16 groupId, // the groupId from which users should be members of to claim the token
        bytes16 groupId2 // the groupId from which users should optionally be members of to claim the token
    )
    ERC20(name,symbol)
    SismoConnect(appId) {
        GROUP_ID = groupId;
        GROUP_ID_2 = groupId2;
    }

    mapping(uint256 => bool) public hasClaimed;


    /**
     * @notice Mints an ERC20 on the address `to` thanks to a sismoConnect response containing a valid proof
     *         with respect to the auth,claims and message signature requests
     * @param response the sismoConnect response from the Data Vault app in bytes
     */

    function claimWithSismo(bytes memory response) public returns (uint256, uint256) {
    //ORIGINAL:     function claimWithSismo(bytes memory response) public returns (uint256) {
        ClaimRequest[] memory claims = new ClaimRequest[](2);
        claims[0] = buildClaim({groupId: GROUP_ID});
        claims[1] = buildClaim({groupId: GROUP_ID_2});

        AuthRequest[] memory auths = new AuthRequest[](1);
        auths[0] = buildAuth({authType: AuthType.VAULT});

        SismoConnectRequest memory request = _requestBuilder.build({
          claims: claims,
          auths: auths,
          signature: buildSignature({message: abi.encode(msg.sender)}),
          appId: appId
        });

        // the verify function will check that the sismoConnectResponse proof is cryptographically valid
        // with respect to the auth, claims and message signature requests
        // i.e it checks that the user is the owner of a Sismo Data Vault
        // and that the user is a member of the groupId specified in the claim request
        // and that the message signature is valid
        SismoConnectVerifiedResult memory result = verify({
          responseBytes: response,
          request: request
        });

        // if the proof is valid, we mint the token to the address `to`
        // the tokenId is the anonymized userId of the user that claimed the token
        uint256 tokenId = result.getUserId(AuthType.VAULT);
        //Adding a basic check to see if an address already claimed or not:
        require(!hasClaimed[tokenId], "User has already claimed tokens. Nice try, but you've already had your share of the pie!");

        //TO DO: change to a  logical calculation for how many tokens to mint
        //Currently has a predefined claim amount
        //TO DO: make sure a user cannot claim twice
        // if the user calls the claimWithSismo function multiple times
        // he should only be able to claim one token
        uint256 claimAmount = 100;
        _mint(msg.sender, claimAmount);

        hasClaimed[tokenId] = true;

        // Now also returns the amount claimed (minted), in addition to the tokenID
         return (tokenId, claimAmount);
    }


    // The following doesn't make sense since ERC-20 doesnt got an override. Kept for completeness.
    //function transfer(address, address, uint256) public virtual override {
    //    revert RegularERC20TransferFromAreNotAllowed();
    //}


}
