import { Box, Heading } from '@chakra-ui/react';
import FavouriteItems from './components/FavouriteItems';
import ItemTable from './components/ItemTable';
import NewItemForm from './components/NewItemForm';

const Items = () => {
  return (
    <Box p='4'>
      <Heading>Artikli</Heading>
      <NewItemForm />
      <FavouriteItems />
      <ItemTable />
    </Box>
  );
};

export default Items;
