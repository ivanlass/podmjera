import { Box, Heading } from '@chakra-ui/react';
import FavouriteSection from './components/FavouriteSection';
import ItemTable from './components/ItemTable';
import NewItemForm from './components/NewItemForm';

const Items = () => {
  return (
    <Box p='4'>
      <Heading>Artikli</Heading>
      <NewItemForm />
      <FavouriteSection />
      <ItemTable />
    </Box>
  );
};

export default Items;
