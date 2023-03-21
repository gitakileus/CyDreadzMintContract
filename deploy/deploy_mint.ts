import { DeployFunction } from "hardhat-deploy/types"
const fn: DeployFunction = async function ({
  deployments: { deploy },
  ethers: { getSigners, getContractFactory },
  network,
}) {
  const deployer = (await getSigners())[0]
  console.log("deployer: ", deployer.address)
  const contractDeployed = await deploy("CyDreadzMintContract", {
    from: deployer.address,
    log: true,
    skipIfAlreadyDeployed: false,
    args: [
      "CyDreadz",
      "Cy",
      "https://gateway.pinata.cloud/ipfs/QmdXM5y8p28HM2KPinHTJFGz81ca3zT1whQAoRg2Hemzo5/",
      "https://gateway.pinata.cloud/ipfs/QmXPVdvebcZRzzkkf6qmoPUb38hpJjv9xM9JhUAbcsKQrw",
    ],
  })
  console.log(
    "npx hardhat verify --network " +
      network.name +
      " " +
      contractDeployed.address
  )
}
fn.skip = async (hre) => {
  // Skip this on ropsten or hardhat.
  const chain = parseInt(await hre.getChainId())
  return false
}
fn.tags = ["CyDreadzMintContract"]

export default fn
