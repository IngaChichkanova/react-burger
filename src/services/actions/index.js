
import { NORMA_API } from '../../utils/constants';

const checkResponse = (res) => res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const request = (endpoint, options) => fetch(`${NORMA_API}/${endpoint}`, options).then(checkResponse);