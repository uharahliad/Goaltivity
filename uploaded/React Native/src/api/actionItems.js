import axios from 'axios';
import {BACK_URL, a} from '@env';

console.log(BACK_URL, a);

const actionItems = {
  createActionItem: async (data, token) => {
    return await axios.post(BACK_URL + '/api/action_items', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  register: async data => {
    return await axios.post(BACK_URL + '/api/action_items', data);
  },
  getActionItems: async (token, goalId) => {
    return await axios.get(BACK_URL + `/api/action_items/${goalId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateActionItem: async (token, data, id) => {
    return await axios.put(BACK_URL + `/api/action_items/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  deleteActionItem: async (token, id) => {
    return await axios.delete(BACK_URL + `/api/action_items/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default actionItems;
