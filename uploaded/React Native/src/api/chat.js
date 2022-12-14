import axios from 'axios';
import {BACK_URL, a} from '@env';

console.log(BACK_URL, a);

const chat = {
  getToken: async (username) =>
    await axios.get(`http://localhost:3001/token/${username}`);
}

export default chat