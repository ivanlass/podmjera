import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
  const { getAccessTokenSilently } = useAuth0();

  async function getAllFavouriteArticles() {
    const accessToken = await getAccessTokenSilently();
    console.log('asdasd', storeID);
    const response = await axios.get(`/api/article/favourites/${storeID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
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

export const useGetStoreArticles = (storeID, options) => {
  async function getStoreArticles() {
    const response = await axios.get(`/api/article/${storeID}/`);
    return response.data;
  }

  return useQuery(['articles'], () => getStoreArticles(), {
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
