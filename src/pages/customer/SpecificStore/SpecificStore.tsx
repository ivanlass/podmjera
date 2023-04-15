import { Box, Input, SimpleGrid, Button } from '@chakra-ui/react';
import { useState } from 'react';
import Basket from '../../../components/Basket';
import ProductCard from '../../../components/ProductCard';
import { products } from '../../../products';
import { BasketProvider } from '../../../store/Basket.Context';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

axios.defaults.withCredentials = true;
const SpecificStore = () => {
  // const as = async () => {
  //   const accessToken = await getAccessTokenSilently();
  //   console.log(accessToken);
  //   axios
  //     .get('http://localhost:6060/api/messages/test', {
  //       headers: {
  //         'content-type': 'application/json',
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const da = async () => {
  //   const accessToken = await getAccessTokenSilently();
  //   console.log(accessToken);
  //   axios
  //     .get('http://localhost:6060/api/messages/adminski', {
  //       headers: {
  //         'content-type': 'application/json',
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <BasketProvider>
      <Box>
        <Basket />
        <SimpleGrid mt={2} px='4' columns={{ base: 2, md: 3, lg: 4, '2xl': 5 }} spacing={4}>
          {products.map((product) => (
            <Box key={product.id}>
              <ProductCard product={product} />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </BasketProvider>
  );
};

export default SpecificStore;
