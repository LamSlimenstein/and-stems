const { ethers } = require('hardhat');

async function main() {
    const Stems = await ethers.getContractFactory("Stems");

    const stems = await Stems.deploy('1000000000000000000','10000');
    console.log("Contract deplyed to address: ", stems.address);
}

main() 
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    });