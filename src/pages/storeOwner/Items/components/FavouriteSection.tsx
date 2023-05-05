import { SimpleGrid, Box, Text, Flex } from '@chakra-ui/react';
import FavouriteItemsPlaceholder from './FavouriteItemsPlaceholder';
import { useGetAllFavouriteArticles } from '../../../../API/Queries';
import { articlesInterface } from '../../../../interfaces/articles.interface';

interface IProps {
  storeID: string;
}

const FavouriteSection = ({ storeID }: IProps) => {
  const { data: favouriteArticles } = useGetAllFavouriteArticles(storeID, {
    enabled: !!storeID,
  });

  const findArticle = (orderNum: number) => {
    return favouriteArticles?.find((article: articlesInterface) => article.position === orderNum);
  };
  return (
    <Box bg='neutral.10' p='4' mt={20} boxShadow='md' borderRadius='xl'>
      <Text fontSize='2xl'>Favoriti</Text>
      <Text color='text.secondary' mb='4'>
        Ovdje stavite artikle koje želite da se prikazuju na početnoj stranici vaše trgovine, kao prvi na popisu.
      </Text>
      <Flex columnGap='4' overflow='auto' scrollSnapType='x mandatory' pb='4' pt='8'>
        <FavouriteItemsPlaceholder orderNum={1} article={findArticle(1)} />
        <FavouriteItemsPlaceholder orderNum={2} article={findArticle(2)} />
        <FavouriteItemsPlaceholder orderNum={3} article={findArticle(3)} />
        <FavouriteItemsPlaceholder orderNum={4} article={findArticle(4)} />
        <FavouriteItemsPlaceholder orderNum={5} article={findArticle(5)} />
        <FavouriteItemsPlaceholder orderNum={6} article={findArticle(6)} />
        <FavouriteItemsPlaceholder orderNum={7} article={findArticle(7)} />
        <FavouriteItemsPlaceholder orderNum={8} article={findArticle(8)} />
      </Flex>
    </Box>
  );
};

export default FavouriteSection;
