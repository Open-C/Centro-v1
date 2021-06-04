import { DeployFunction } from ".";
import { ethers } from "hardhat";
import protocolAddresses from "./build_config.json";
import { string } from "hardhat/internal/core/params/argumentTypes";
import { ICeloNetwork } from "@ubeswap/hardhat-celo";

export const deployStorage: DeployFunction = async (env) => {
  const [deployer] = env.celo.getSigners();
  const deployerAddress = await deployer?.getAddress();
  const chainId = await env.celo.kit.connection.chainId();
  const network = chainId === ICeloNetwork.MAINNET ? "MainNet" : "Alfajores";
  const protocols: Record<string, string> =
    protocolAddresses["contracts"][network];
  console.log(`Deploying from address ${deployerAddress}`);

  const Storage = await ethers.getContractFactory("Storage");
  const storageContract = await Storage.deploy();
  await storageContract.init([deployerAddress]);
  Object.entries(protocols).forEach(async ([name, address]) => {
    await storageContract.newAddress(name, address);
  });

  return {
    Storage: storageContract.address,
  };
};
