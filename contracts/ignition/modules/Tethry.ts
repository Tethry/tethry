// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TOKEN_ADDRESS = "0x70112865C27d11E855aD45a3BAA10207C036BD1E";
const INITIAL_FEE_PERCENTAGE = 2;

const TethryModule = buildModule("TethryModule", (m) => {
  const tethry = m.contract("Tethry", [TOKEN_ADDRESS, INITIAL_FEE_PERCENTAGE]);

  return { tethry };
});

export default TethryModule;
