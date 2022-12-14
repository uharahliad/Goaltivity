import axios from 'axios';
import {BACK_URL, a} from '@env';

console.log(BACK_URL, a);

const auth = {
  login: async data => {
    return await axios.post(BACK_URL + '/api/auth/signin/local', data);
  },
  register: async data => {
    return await axios.post(BACK_URL + '/api/auth/signup', data);
  },
  ValidateToken: async token => {
    return await axios.get(BACK_URL + '/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getTwilioToken: async username => {
    return await axios.get(BACK_URL + `/token/${username}`);
  },
  test: async () => {
    return await axios.get(BACK_URL + '/api/auth/test');
  },
};

export default auth;
