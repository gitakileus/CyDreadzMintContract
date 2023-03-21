import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy"
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";

import { config as envConfig } from "dotenv-flow"
envConfig()

/**
 * @dev Supported networks
  ETH mainnet
  Goerli
  BSC mainnet
  BSC testnet
*/

console.log(process.env.GOERLI_URL);


import "./task/verify";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.1",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },

  networks: {
    hardhat: {
      hardfork: "istanbul",
      forking: {
        // blockNumber: 14592087,
        // blockNumber: 39512000, // matic
        // blockNumber: 831317, // astra
        // blockNumber: 29959371, // polygon
        // blockNumber: 27606907, // test bsc
        url: "https://data-seed-prebsc-1-s3.binance.org:8545/", // May 31, 2021
      },
      gas: 9500000,
      gasPrice: 1000000, // TODO: Consider removing this again.
      ...(process.env.COVERAGE && {
        allowUnlimitedContractSize: true,
      }),
    },

    mainnet: {
      url: process.env.MAINNET_URL || "",
      accounts: [
        process.env.PRIVATE_KEY || "",
        process.env.OTHER_PRIVATE_KEY || "",
      ],
    },
    goerli: {
      url: process.env.GOERLI_URL || "",
      accounts: [
        process.env.PRIVATE_KEY || "",
        process.env.OTHER_PRIVATE_KEY || "",
      ],
    },
    arb: {
      url: process.env.MAINNET_URL || "",
      accounts: [
        process.env.PRIVATE_KEY || "",
        process.env.OTHER_PRIVATE_KEY || "",
      ],
    },
    arbTestnet: {
      url: process.env.ARB_TEST_URL || "",
      accounts: [
        process.env.PRIVATE_KEY || "",
        process.env.OTHER_PRIVATE_KEY || "",
      ],
    },
  },
  etherscan: {
    apiKey: {
      bsc: process.env.BSCSCAN_API_KEY as string,
      bscTestnet: process.env.BSCSCAN_API_KEY as string,
      mainnet: process.env.ETHERSCAN_API_KEY as string,
      goerli: process.env.ETHERSCAN_API_KEY as string
    }
  },
}

export default config
