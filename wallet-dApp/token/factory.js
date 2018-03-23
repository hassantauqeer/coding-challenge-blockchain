import web3 from './web3';
import SavingToken from './build/SavingToken.json';

const instance = new web3.eth.Contract(
  JSON.parse(SavingToken.interface),
  '0xd26604e4EDB2307EA36A3f7BE95e3f213aB15004'
);

export default instance;
