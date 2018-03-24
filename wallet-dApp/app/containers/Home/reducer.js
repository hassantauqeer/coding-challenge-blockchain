/*
 *
 * Home reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SAVE_TOKEN,
} from './constants';

const initialState = fromJS({
  info: {
    tokenLoaded: false,
    name: '',
    symbol: '',
    totalSupply: '',
    contractAddress: '',
    owner: '',
    metaMaskAccountBalance: '',
    metaMaskAccount: '',
  }

});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      console.log(action.data)
      // console.log(state.setIn(['info', 'tokenLoaded']));
      return state.set('info', action.data);

    default:
      return state;
  }
}

export default homeReducer;
