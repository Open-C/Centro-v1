import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer, BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { CentroMain as CentroMainAddress } from "../../deployments/main.alfajores.addresses.json";
import { TestFunction, getDeployment } from ".";
import { doTx, ICeloNetwork } from "@ubeswap/hardhat-celo";
import { ContractKit, newKit } from "@celo/contractkit";
import { v4 as uuidv4 } from "uuid";

const SIPHON_ADDRESS = "0x6c0d6Fba3bcdb224278474E8d524F19c6BB55850";

export const TestMoolaConnector: TestFunction = async (env) => {
  const owner = env.celo.getSigners();
  const chainId = env.network.config.chainId || ICeloNetwork["ALFAJORES"];
  const centroMainAddress = getDeployment("main", chainId);
  const CentroMain = await ethers.getContractFactory("CentroMain");
  const centroMain = CentroMain.attach(CentroMainAddress);
  return {
    ...createWallet(centroMain, uuidv4()),
  };
};

const createWallet = async (
  centroMain: Contract,
  name: string
): Promise<Record<string, string>> => {
  try {
    doTx(`Creating a wallet named ${name}`, centroMain.newWallet(name));
    const walletAddress = await centroMain.getWallet("0");
    console.log(`Wallet created at address ${walletAddress}`);
    return {
      createWallet: "Passed",
    };
  } catch (e) {
    console.log(e);
    return {
      createWallet: "Failed",
    };
  }
};
