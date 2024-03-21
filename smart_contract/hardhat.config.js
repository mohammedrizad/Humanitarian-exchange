require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/z8i8H5G-Trp68wHfvKdzLw6D9xm5foyS',
      accounts: ['16d6c10ecafb4ef106ab0668050e29d97d9d4ece8f951f641fbfae93e1a1ae2d'],
    },
  },
};