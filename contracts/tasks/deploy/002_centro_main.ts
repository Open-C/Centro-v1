import { DeployFunction } from ".";
import { ethers } from "hardhat";
import { Storage } from "../../deployments/storage.alfajores.addresses.json";

export const deployCentroMain: DeployFunction = async (env) => {
  const [deployer] = env.celo.getSigners();
  const deployerAddress = await deployer?.getAddress();
  const CentroMain = await ethers.getContractFactory("CentroMain");
  const centroMain = await CentroMain.deploy(Storage, deployerAddress);

  return {
    CentroMain: centroMain.address,
  };
};
