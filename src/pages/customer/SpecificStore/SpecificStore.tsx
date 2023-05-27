import { Box, Text } from '@chakra-ui/react';
import Basket from '../../../components/Basket';
import { BasketProvider } from '../../../store/Basket.Context';
import InfiniteProducts from './components/InfiniteProducts';
import ProductFilters from './components/ProductFilters';
import { useState } from 'react';
import StoreHero from './components/StoreHero';
import SidebarFilter from './components/SidebarFilter';

const SpecificStore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Sve');

  return (
    <BasketProvider>
      <Box mt='56px'>
        <Basket />
        <SidebarFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}>
          <ProductFilters />
          <StoreHero />
          <InfiniteProducts />
        </SidebarFilter>
      </Box>
    </BasketProvider>
  );
};

export default SpecificStore;
