import { SimpleGrid, Text } from '@chakra-ui/react';
import FavouriteItemsPlaceholder from './FavouriteItemsPlaceholder';

const FavouriteSection = () => {
  return (
    <>
      <Text mt={8} fontSize='2xl'>
        Favoriti
      </Text>
      <Text color='text.secondary' mb='4'>
        Ovdje stavite artikle koje želite da se prikazuju na početnoj stranici vaše trgovine, kao prvi na popisu.
      </Text>
      <SimpleGrid mb='8' columns={{ base: 2, sm: 3, md: 4, lg: 6, xl: 8 }} spacing={4}>
        <FavouriteItemsPlaceholder orderNum={1} />
        <FavouriteItemsPlaceholder orderNum={2} />
        <FavouriteItemsPlaceholder orderNum={3} />
        <FavouriteItemsPlaceholder orderNum={4} />
        <FavouriteItemsPlaceholder orderNum={5} />
        <FavouriteItemsPlaceholder orderNum={6} />
        <FavouriteItemsPlaceholder orderNum={7} />
        <FavouriteItemsPlaceholder orderNum={8} />
      </SimpleGrid>
    </>
  );
};

export default FavouriteSection;
