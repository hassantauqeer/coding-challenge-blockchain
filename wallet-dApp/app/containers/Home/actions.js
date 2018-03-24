/*
 *
 * Home actions
 *
 */

import {
  LOAD_TOKEN, SAVE_TOKEN
} from './constants';

export function loadToken() {
  return {
    type: LOAD_TOKEN,
  };
}

export function saveToken(data) {
  return {
    type: SAVE_TOKEN,
    data
  };
}
