import { ethers, Contract } from 'ethers';
import Stems from './contracts/Stems.json';

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const stem = new Contract(
          Stems.networks[window.ethereum.networkVersion].address,
          Stems.abi,
          signer
        );

        resolve({stem});
      }
      resolve({stem: undefined});
    });
  });

export default getBlockchain;