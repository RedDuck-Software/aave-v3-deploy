import { task } from "hardhat/config";
import { getFaucet } from "../../helpers/contract-getters";
import { parseUnits } from "ethers/lib/utils";

task(
  `transfer-faucet-ownership`,
  `Transfers ownership of the faucet to relayer`
)
  .addParam("owner", "new owners address")
  .setAction(async ({ owner }, hre) => {
    const { deployer } = await hre.getNamedAccounts();

    const faucetContract = await getFaucet();

    console.log(`Faucet contract transferred to new owner ${owner}`);

    const tx = await faucetContract.transferOwnership(owner);

    console.log(`Faucet contract transferred to relayer ${owner}`);
    console.log(`TX ${tx}`);
  });

task(`mint-test-tokens`, `Mint test tokens to useers`)
  .addParam("faucet", "Faucet address")
  .addParam("token", "Token address")
  .addParam("address", "User address")
  .setAction(async ({ faucet: faucetAddress, token, address }, hre) => {
    const { deployer } = await hre.getNamedAccounts();

    const faucet = await getFaucet(faucetAddress);

    await faucet.mint(token, address, parseUnits("100"));

    console.log("DONE");
  });
