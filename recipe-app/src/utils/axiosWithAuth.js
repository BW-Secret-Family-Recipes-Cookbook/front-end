import axios from 'axios';

export const axiosWithAuth = () => {
  const token = window.localStorage.getItem('token');
  return axios.create({
    headers: {
      authorization: token,
    },
    baseURL: 'http://samkester-secret-recipes.herokuapp.com/',
  });
};
