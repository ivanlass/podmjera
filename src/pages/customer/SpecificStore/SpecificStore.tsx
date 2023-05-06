import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';
import Basket from '../../../components/Basket';
import ProductCard from '../../../components/ProductCard';
import { products } from '../../../products';
import { BasketProvider } from '../../../store/Basket.Context';
import { useGetStoreArticles, useGetStore } from '../../../API/Queries';
import { useParams } from 'react-router-dom';
import { articlesInterface } from '../../../interfaces/articles.interface';

const SpecificStore = () => {
  const { storeID } = useParams<{ storeID: string }>();
  // todo dohvati store
  // const { data: store, isLoading: isLoadingStore, isError: isErrorStore } = useGetStore();
  const { data: storeArticles, isLoading, isError } = useGetStoreArticles(storeID);

  if (isLoading)
    return (
      <Box w='100vw' h='100vh' display='flex' justifyContent='center' alignItems='center'>
        <Spinner size={'xl'} />
      </Box>
    );
  if (isError) return <Box>Error</Box>;

  return (
    <BasketProvider>
      <Box>
        <Basket />
        <SimpleGrid mt={2} px='4' columns={{ base: 2, md: 3, lg: 4, '2xl': 5 }} spacing={{ base: 2, md: 4 }}>
          {storeArticles.map((product: articlesInterface) => (
            <Box key={product._id}>
              <ProductCard product={product} />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </BasketProvider>
  );
};

export default SpecificStore;
