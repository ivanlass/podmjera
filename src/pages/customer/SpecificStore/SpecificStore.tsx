import { Box, SimpleGrid } from '@chakra-ui/react';
import ItemCard from '../../../components/ProductCard';
import CategoryCard from '../../storeOwner/Categories/components/CategoryCard';

const SpecificStore = () => {
  return (
    <Box>
      <SimpleGrid mt='4' columns={{ base: 1, md: 3, lg: 4 }} spacing={4}>
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </SimpleGrid>
    </Box>
  );
};

export default SpecificStore;
