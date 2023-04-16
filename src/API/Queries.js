import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';

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

// get user data from the database
export const useGetUser = (userID, options) => {
  const { getAccessTokenSilently } = useAuth0();
  async function getUser() {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.post(
      `/api/user/getuser/`,
      { userID },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }

  return useQuery(['userMeta'], () => getUser(), {
    ...options,
    enabled: false,
  });
};

// get user data from the database
export const useGetStore = (userID, options) => {
  const { getAccessTokenSilently } = useAuth0();
  async function getStore() {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.post(
      `/api/store/getstore/`,
      { userID },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }

  return useQuery(['store'], () => getStore(), {
    ...options,
  });
};

export const useSaveStoreName = (options) => {
  const { getAccessTokenSilently, user } = useAuth0();

  async function saveStoreName(storeName) {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.post(
      '/api/store/storename',
      { authID: user.sub, storeName },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }

  return useMutation(saveStoreName, { ...options });
};

export const useSaveStoreSettings = (options) => {
  const { getAccessTokenSilently, user } = useAuth0();
  async function saveStoreSettings(storeSettings) {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.post(
      '/api/store/savestoresettings',
      { authID: user.sub, ...storeSettings },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  return useMutation(saveStoreSettings, { ...options });
};
