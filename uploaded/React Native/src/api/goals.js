import axios from 'axios';
import {BACK_URL, a} from '@env';

console.log(BACK_URL, a);

const goals = {
  getGoals: async (token, author) => {
    return await axios.get(BACK_URL + `/api/goals/${author}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getGoal: async (token, id) => {
    return await axios.get(BACK_URL + `/api/goals/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createGoal: async (data, token) => {
    return await axios.post(BACK_URL + '/api/goals', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateGoal: async (data, token, id) => {
    return await axios.put(BACK_URL + `/api/goals/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteGoal: async (token, id) => {
    return await axios.delete(BACK_URL + `/api/goals/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  //   getUserInfo: async token => {
  //     return await axios.get(BACK_URL + '/api/auth/me', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //   },
};

export default goals;
