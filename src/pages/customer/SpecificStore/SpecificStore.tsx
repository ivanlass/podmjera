import { Box, Text } from '@chakra-ui/react';
import Basket from '../../../components/Basket';
import { BasketProvider } from '../../../store/Basket.Context';
import InfiniteProducts from './components/InfiniteProducts';
import ProductFilters from './components/ProductFilters';
import { useState } from 'react';
import StoreHero from './components/StoreHero';

const SpecificStore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  return (
    <BasketProvider>
      <Box mt='20'>
        <StoreHero />
        <Basket />
        <ProductFilters selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        <InfiniteProducts />
      </Box>
    </BasketProvider>
  );
};

export default SpecificStore;
