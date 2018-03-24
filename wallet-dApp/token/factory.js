import web3 from './web3';
import SavingToken from './build/SavingToken.json';

const instance = new web3.eth.Contract(
  JSON.parse(SavingToken.interface),
  '0xDebcD911461de15bCaf6Bb67d49FCfB2d1285Fd6'
);

export default instance;
