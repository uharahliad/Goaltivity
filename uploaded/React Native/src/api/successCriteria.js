import axios from 'axios';
import {BACK_URL, a} from '@env';

console.log(BACK_URL, a);

const successCriteria = {
  getSuccessCriteria: async token => {
    return await axios.get(BACK_URL + '/api/success_criteria', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getSuccessCriteriaItem: async (token, id) => {
    return await axios.get(BACK_URL + `/api/success_criteria/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getSuccessCriteriaItemByGoalId: async (token, id) => {
    return await axios.get(BACK_URL + `/api/success_criteria/goal/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  createSuccessCriteriaItems: async (data, token) => {
    return await axios.post(BACK_URL + '/api/success_criteria', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });
  },
  createSuccessCriteriaItem: async (data, token) => {
    return await axios.post(BACK_URL + '/api/success_criteria/one', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteSuccessCriteria: async (token, id) => {
    return await axios.delete(BACK_URL + `/api/success_criteria/${id}`, {
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

export default successCriteria;
