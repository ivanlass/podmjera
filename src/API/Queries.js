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

// use this for fetching store if user have store
// its different query key from useGetSpecificStore
export const useGetStore = (userID, options) => {
  async function getStore() {
    const response = await axios.post(`/api/store/getstore/`, { userID });
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

export const useSaveCategory = (options) => {
  const { getAccessTokenSilently, user } = useAuth0();
  async function saveCategory(payload) {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.post(
      '/api/store/category/add',
      { authID: user.sub, ...payload },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }

  return useMutation(saveCategory, { ...options });
};

// storeID, category (name)
export const useDeleteCategories = (options) => {
  const { getAccessTokenSilently } = useAuth0();
  async function deleteCategory(payload) {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.post(
      `/api/store/category/delete`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }

  return useMutation(deleteCategory, { ...options });
};

export const useAddArticle = (options) => {
  const { getAccessTokenSilently, user } = useAuth0();
  async function addArticle(storeSettings) {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.post(
      '/api/article/add',
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

  return useMutation(addArticle, { ...options });
};

export const useEditArticle = (options) => {
  const { getAccessTokenSilently, user } = useAuth0();

  async function editArticle(article) {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.put(
      '/api/article/edit',
      { ...article },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  return useMutation(editArticle, { ...options });
};

export const useDeleteArticle = (options) => {
  const { getAccessTokenSilently } = useAuth0();

  async function deleteArticle(storeSettings) {
    console.log(storeSettings);
    const accessToken = await getAccessTokenSilently();
    const response = await axios.post(
      '/api/article/delete',
      { ...storeSettings },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }

  return useMutation(deleteArticle, { ...options });
};

export const checkIfStoreHasItems = async (storeId) => {
  try {
    const response = await axios.get(`/api/article/check-store-items/${storeId}`);
    const items = response.data.message;
    return items;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const useSearchArticles = (options) => {
  async function searchArticles({ storeID, searchQuery }) {
    const response = await axios.get(`/api/article/search/${searchQuery}/${storeID}`);
    return response.data;
  }

  return useMutation(searchArticles, {
    ...options,
  });
};

export const useSaveFavouriteArticle = (options) => {
  const { getAccessTokenSilently } = useAuth0();

  async function saveFavouriteArticle(payload) {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.post(
      '/api/article/favourite/add',
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }

  return useMutation(saveFavouriteArticle, { ...options });
};

export const useRemoveFavouriteArticle = (options) => {
  const { getAccessTokenSilently } = useAuth0();

  async function removeFavouriteArticle(id) {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.delete(`/api/article/favourite/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
  return useMutation(removeFavouriteArticle, { ...options });
};

export const useGetAllFavouriteArticles = (storeID, options) => {
  async function getAllFavouriteArticles() {
    const response = await axios.get(`/api/article/favourites/${storeID}`);
    return response.data;
  }

  return useQuery(['favourites'], () => getAllFavouriteArticles(), {
    ...options,
    staleTime: 1000 * 60 * 60 * 24,
  });
};

export const useGetStores = (options) => {
  async function getStores() {
    const response = await axios.get(`/api/store/getstores/`);
    return response.data;
  }

  return useQuery(['stores'], () => getStores(), {
    ...options,
  });
};

// get specific store. For example, when user click on store name in the store picker
export const useGetSpecificStore = (storeID, options) => {
  async function getSpecificStore() {
    const response = await axios.get(`/api/store/${storeID}/`);
    return response.data;
  }

  return useQuery(['specificStore'], () => getSpecificStore(), {
    ...options,
  });
};

// get searched products.
export const useGetSearchedProducts = (searchQuery, storeID, options) => {
  async function getSearchedProducts() {
    const response = await axios.get(`/api/article/search/${searchQuery}/${storeID}`);
    return response.data;
  }

  return useQuery(['searchedArticles'], () => getSearchedProducts(), {
    ...options,
  });
};

export const useSaveAddress = (options) => {
  const { getAccessTokenSilently } = useAuth0();

  async function saveAddress(payload) {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.post(
      `/api/user/saveaddress/`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
  return useMutation(saveAddress, { ...options });
};

export const useSavePhoneNumber = (options) => {
  const { getAccessTokenSilently } = useAuth0();

  async function useSavePhoneNumber(payload) {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.post(
      `/api/user/savephonenumber/`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
  return useMutation(useSavePhoneNumber, { ...options });
};

export const useMakeOrder = (options) => {
  const { getAccessTokenSilently } = useAuth0();

  async function createOrder(payload) {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.post(
      `/api/orders/createorder/`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  }
  return useMutation(createOrder, { ...options });
};

// get orders that will user see in the orders page
export const useGetMyOrders = (userID, options) => {
  const { getAccessTokenSilently } = useAuth0();

  async function getMyOrders() {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.get(`/api/orders/myorders/${userID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  return useQuery(['myOrders'], () => getMyOrders(), {
    ...options,
  });
};

// get orders for specific store
export const useGetStoreOrders = (storeID, userID, options) => {
  const { getAccessTokenSilently } = useAuth0();

  async function getStoreOrders() {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.get(`/api/orders/storeOrders/${storeID}/${userID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }

  return useQuery(['storeOrders'], () => getStoreOrders(), {
    ...options,
  });
};

// change status of order
export const useChangeOrderStatus = (options) => {
  const { getAccessTokenSilently } = useAuth0();

  async function changeOrderStatus({ storeID, orderID, status }) {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.get(`/api/orders/changestatus/${storeID}/${orderID}/${status}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  }
  return useMutation(changeOrderStatus, { ...options });
};


// `useStoreStatistics` is a custom hook that fetches the statistics of a specific store.
export const useStoreStatistics = (storeID, options) => {
  const { getAccessTokenSilently } = useAuth0();

  const fetchStoreStatistics = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await axios.get(`/api/store/${storeID}/statistics`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  };

  return useQuery(['storeStatistics', storeID], fetchStoreStatistics, { staleTime: 1000 * 60 * 5, ...options });
};