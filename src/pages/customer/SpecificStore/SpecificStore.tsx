import { Box, SimpleGrid } from '@chakra-ui/react';
import Basket from '../../../components/Basket';
import ProductCard from '../../../components/ProductCard';
import { products } from '../../../products';
import { BasketProvider } from '../../../store/Basket.Context';
import axios from 'axios';

axios.defaults.withCredentials = true;
const SpecificStore = () => {
  return (
    <BasketProvider>
      <Box>
        <Basket />
        <SimpleGrid mt={2} px='4' columns={{ base: 2, md: 3, lg: 4, '2xl': 5 }} spacing={{ base: 2, md: 4 }}>
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
