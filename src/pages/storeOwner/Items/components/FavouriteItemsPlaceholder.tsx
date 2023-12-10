import { Box, Icon, IconButton, Image, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { useDrop } from 'react-dnd';
import { articlesInterface } from '../../../../interfaces/articles.interface';
import { AiOutlineClose } from 'react-icons/ai';
import { useRemoveFavouriteArticle } from '../../../../API/Queries';
import { useQueryClient } from '@tanstack/react-query';
import { TbSoup } from 'react-icons/tb';

export const ItemTypes = {
  BOX: 'box',
};

interface IProps {
  orderNum: number;
  article: articlesInterface;
}

export const FavouriteItemsPlaceholder: FC<IProps> = ({ orderNum, article }) => {
  const queryClient = useQueryClient();
  const { mutate: removeFavouriteArticle, isLoading } = useRemoveFavouriteArticle({
    onSuccess: (data: articlesInterface) => {
      queryClient.setQueryData(['favourites'], (old: any) => {
        const filteredData = old.filter((item: articlesInterface) => item._id !== data._id);
        return filteredData;
      });
    },
  });
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: orderNum }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const handleRemoveFavourite = () => {
    removeFavouriteArticle(article?._id);
  };

  const isActive = canDrop && isOver;
  let backgroundColor = 'neutral.10';
  if (isActive) {
    backgroundColor = 'neutral.10';
  } else if (canDrop) {
    backgroundColor = 'primary.50';
  }

  return (
    <Box
      position='relative'
      border='1px dashed'
      scrollSnapAlign='start'
      minW='200px'
      borderColor='neutral.50'
      p='4'
      boxShadow='md'
      h={'200px'}
      borderRadius='xl'
      ref={article ? null : drop}
      bg={backgroundColor}
    >
      {article?.name ? (
        <Box w='100%' height='100%' display='flex' alignItems='center' justifyContent='flex-start' flexDir='column'>
          <Text textAlign='center'>{article?.name}</Text>
          <Image borderRadius='xl' w='100%' height='140px' objectFit='cover' src={article?.image} alt={article?.name} fallback={<Icon as={TbSoup} mt='10' boxSize='2em' />} />
        </Box>
      ) : isActive ? (
        'Release to drop'
      ) : (
        'Prevucite artikal ovde'
      )}
      {article && (
        <IconButton
          disabled={isLoading}
          aria-label='close'
          position='absolute'
          top='-15px'
          right='-15px'
          borderRadius='full'
          onClick={handleRemoveFavourite}
          icon={<AiOutlineClose />}
        />
      )}
    </Box>
  );
};

export default FavouriteItemsPlaceholder;
