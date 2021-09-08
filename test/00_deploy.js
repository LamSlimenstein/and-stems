const { expect } = require('chai');
const { deployments, ethers } = require('hardhat');

describe('Stems', () => {
    let Stems;
    let deployer;

    const ADDRESS_ZERO = ethers.constants.AddressZero;

    beforeEach(async () => {
        [deployer, randomAccount] = await ethers.getSigners();

        await deployments.fixture();

        Stem = await deployments.get('Stems');
        stems = await ethers.getContractAt(
            'Stems',
            Stems.address,
            deployer,
        );
    });

})
