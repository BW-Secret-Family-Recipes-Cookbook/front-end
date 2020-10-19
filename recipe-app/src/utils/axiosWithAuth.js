import axios from 'axios';

export const axiosWithAuth = () => {
  const token = window.localStorage.getItem('token');
  return axios.create({
    headers: {
      authorization: token,
    },
    baseURL: '',
    //need from sam ^^, oauth that we will need to ajust for.
  });
};
