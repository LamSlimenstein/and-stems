// deploy/00_deploy_my_contract.js
module.exports = async ({getNamedAccounts, deployments}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('Stems', {
    from: deployer,
    args: ['1000000000000000000','10000'],
    log: true,
  });
  // const stems = await Stems.deployed();
  // console.log('Stems.sol has been deployed to: ', stems.address);
  // await stems.mintStem();
  // console.log('Stem minted by forager.',tokenId);
};
module.exports.tags = ['Stems'];