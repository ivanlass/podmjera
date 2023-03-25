import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useMutation } from 'react-query';

axios.defaults.baseURL = process.env.REACT_APP_API_SERVER_URL;

export const useCreateUser = (options) => {
  const { getAccessTokenSilently, user } = useAuth0();

  async function saveNewUser() {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.post('/api/user/signup', user, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  return useMutation(saveNewUser, { ...options });
};
