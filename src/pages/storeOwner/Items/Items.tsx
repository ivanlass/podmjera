import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import FavouriteItemsPlaceholder from './components/FavouriteItemsPlaceholder';
import ItemTable from './components/ItemTable';
import NewItemForm from './components/NewItemForm';

const Items = () => {
  return (
    <Box p='4'>
      <Heading>Artikli</Heading>
      <NewItemForm />
      <Text mt={8} fontSize='2xl'>
        Favoriti
      </Text>
      <Text color='text.secondary' mb='4'>
        Ovdje stavite artikle koje želite da se prikazuju na početnoj stranici
        vaše trgovine, kao prvi na popisu.
      </Text>
      <SimpleGrid
        mb='8'
        columns={{ base: 2, sm: 3, md: 4, lg: 6, xl: 8 }}
        spacing={4}
      >
        <FavouriteItemsPlaceholder />
        <FavouriteItemsPlaceholder />
        <FavouriteItemsPlaceholder />
        <FavouriteItemsPlaceholder />
        <FavouriteItemsPlaceholder />
        <FavouriteItemsPlaceholder />
        <FavouriteItemsPlaceholder />
        <FavouriteItemsPlaceholder />
      </SimpleGrid>

      <ItemTable />
    </Box>
  );
};

export default Items;
