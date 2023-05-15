import { Box, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import Basket from '../../../components/Basket';
import ProductCard from '../../../components/ProductCard';
import { BasketProvider } from '../../../store/Basket.Context';
import { useGetStoreArticles, useGetSpecificStore } from '../../../API/Queries';
import { useParams } from 'react-router-dom';
import { articlesInterface } from '../../../interfaces/articles.interface';
import InfiniteProducts from './InfiniteProducts';

const SpecificStore = () => {
  const { storeID } = useParams<{ storeID: string }>();
  // todo dohvati specificstore
  const { data: store } = useGetSpecificStore(storeID);

  const { data: storeArticles, isLoading, isError } = useGetStoreArticles(storeID);

  if (isLoading)
    return (
      <Box w='100vw' h='100vh' display='flex' justifyContent='center' alignItems='center'>
        <Spinner size={'xl'} />
      </Box>
    );
  if (isError)
    return (
      <Box w='100vw' h='100vh' display='flex' justifyContent='center' alignItems='center'>
        <Text>Greška, molimo pokušajte kasnije</Text>
      </Box>
    );

  return (
    <BasketProvider>
      <Box>
        <Basket />
        <InfiniteProducts />
        {/* <SimpleGrid mt={2} px='4' columns={{ base: 2, md: 3, lg: 4, '2xl': 5 }} spacing={{ base: 2, md: 4 }}>
          {storeArticles.map((product: articlesInterface) => (
            <Box key={product._id}>
              <ProductCard product={product} />
            </Box>
          ))}
        </SimpleGrid> */}
      </Box>
    </BasketProvider>
  );
};

export default SpecificStore;
