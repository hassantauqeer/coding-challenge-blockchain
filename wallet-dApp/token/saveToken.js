import web3 from './web3';
import * as SavingToken from './build/SavingToken.json';

export default new web3.eth.Contract(JSON.parse(SavingToken.interface), "0xd26604e4EDB2307EA36A3f7BE95e3f213aB15004");

// console.log(instance, web3, 'savetoken.js')
