// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import {AirdropLevel2} from "contracts/AirdropLevel2.sol";

contract DeployAirdropLevel2 is Script {
    bytes16 public constant APP_ID =  0x6aa6b65b0f51e64729bc06022e76127b;
    bytes16 public constant GROUP_ID = 0x349d8bd135bd903a633464f9b303c902;
    bytes16 public constant GROUP_ID_2 = 0xc6ae11a89cc5cf7a34dac84c7d7b8eff;

    function run() public {
        vm.startBroadcast();
        AirdropLevel2 airdropLevel2 = new AirdropLevel2({name: "My airdropLevel2 contract", symbol: "AIR2", appId: APP_ID, groupId: GROUP_ID, groupId2: GROUP_ID_2});
        console.log("AirdropLevel2 Contract deployed at", address(airdropLevel2));
        vm.stopBroadcast();
    }
}
