require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../src/artifacts/contracts/Stems.sol/Stems.json");
console.log(JSON.stringify(contract.abi));
const contractAddress = "0x6D17091009D91ffc967bC57d959C9E412c6cF776";
const stemsContract = new web3.eth.Contract(contract.abi, contractAddress);

async function on_off_button() {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest' );

    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'data': stemsContract.methods.on_off_button().encodeABI()
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

on_off_button()