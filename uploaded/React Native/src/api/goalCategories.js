import axios from 'axios';
import {BACK_URL, a} from '@env';

console.log(BACK_URL, a);

const goalCategories = {
  getGoalCategories: async token => {
    return await axios.get(BACK_URL + '/api/goal_categories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getGoalCategory: async (token, id) => {
    return await axios.get(BACK_URL + `/api/goal_categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createGoalCategory: async (data, token) => {
    return await axios.post(BACK_URL + '/api/goal_categories', data, {
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

export default goalCategories;
