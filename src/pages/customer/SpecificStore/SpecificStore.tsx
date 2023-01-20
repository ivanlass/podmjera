import { Box, SimpleGrid } from '@chakra-ui/react';
import Basket from '../../../components/Basket';
import ProductCard from '../../../components/ProductCard';
import { products } from '../../../products';
import { BasketProvider } from '../../../store/Basket.Context';

const SpecificStore = () => {
  return (
    <BasketProvider>
      <Box>
        <Basket />
        <SimpleGrid
          px='4'
          mt='4'
          columns={{ base: 2, md: 3, lg: 4, '2xl': 5 }}
          spacing={4}
        >
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
