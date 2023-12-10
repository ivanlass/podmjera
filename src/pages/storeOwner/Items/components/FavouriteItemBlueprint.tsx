import { Tr, useToast } from '@chakra-ui/react';
import type { FC } from 'react';
import { useDrag } from 'react-dnd';
import { useSaveFavouriteArticle } from '../../../../API/Queries';
import { useQueryClient } from '@tanstack/react-query';
import { articlesInterface } from '../../../../interfaces/articles.interface';

export const ItemTypes = {
  BOX: 'box',
};
export interface BoxProps {
  name: string;
  children: React.ReactNode;
  articleID: string;
  storeID: string;
}

interface DropResult {
  name: string;
}

const FavouriteItem: FC<BoxProps> = function Box({ name, children, articleID, storeID }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate: saveFavouriteArticle, isLoading: isLoadingFavourite } = useSaveFavouriteArticle({
    onSuccess: (newFavourite: articlesInterface) => {
      queryClient.setQueryData(['favourites'], (old: any) => [...old, newFavourite]);

      toast({
        title: 'Artikal je uspešno sačuvan',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        saveFavouriteArticle({ articleID, storeID, position: dropResult.name });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <Tr cursor='move' ref={drag} style={{ opacity }} _hover={{ background: 'neutral.30' }}>
      {children}
    </Tr>
  );
};

export default FavouriteItem;
