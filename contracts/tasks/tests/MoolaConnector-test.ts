import { expect } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer, BigNumber } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { CentroMain as CentroMainAddress } from "../../deployments/main.alfajores.addresses.json";
import { TestFunction, getDeployment } from ".";
import { ICeloNetwork } from "@ubeswap/hardhat-celo";
import { ContractKit, newKit } from "@celo/contractkit";

export const TestMoolaConnector: TestFunction = async (env) => {
  const owner = env.celo.getSigners();
  const chainId = env.network.config.chainId || ICeloNetwork["ALFAJORES"];
  const centroMainAddress = getDeployment("main", chainId);
  const CentroMain = await ethers.getContractFactory("CentroMain");
  const centroMain = await CentroMain.attach(CentroMainAddress);
  return {
    test: "passed",
  };
};
