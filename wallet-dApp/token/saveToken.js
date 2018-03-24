import web3 from './web3';
import * as SavingToken from './build/SavingToken.json';

export default new web3.eth.Contract(JSON.parse(SavingToken.interface), "0x91bbb106f68f4f87dE8789E9B0423A6CCb1E68A6");

// console.log(instance, web3, 'savetoken.js')
