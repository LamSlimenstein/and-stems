require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../src/artifacts/contracts/Stems.sol/Stems.json");
console.log(JSON.stringify(contract.abi));
const contractAddress = "0x1A565507903C81FBC617bD5483440b8c39789606";
const stemsContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintStem() {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest' );

    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 600000,
        'data': stemsContract.methods.mintStem().encodeABI(),
        'value': 1000000000000000000
    }
    
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",hash
                        )
                    } else {
                        console.log(
                            "something went wrong when submitting your transaction:",err
                        )
                    }
                }
            )
        }) 
        .catch((err) => {
            console.log(" Promise failed: ",err)
        })
}

mintStem()