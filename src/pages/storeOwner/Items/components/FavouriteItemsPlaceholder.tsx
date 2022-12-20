import { Box } from '@chakra-ui/react';
import type { FC } from 'react';
import { useDrop } from 'react-dnd';

export const ItemTypes = {
  BOX: 'box',
};

export const FavouriteItemsPlaceholder: FC = () => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BOX,
    drop: () => ({ name: '1' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = 'neutral.10';
  if (isActive) {
    backgroundColor = 'neutral.10';
  } else if (canDrop) {
    backgroundColor = 'primary.50';
  }

  return (
    <Box
      border='1px dashed'
      borderColor='neutral.50'
      p='4'
      boxShadow='base'
      minH={'200px'}
      borderRadius='md'
      ref={drop}
      bg={backgroundColor}
      data-testid='dustbin'
    >
      {isActive ? 'Release to drop' : 'Drag a box here'}
    </Box>
  );
};

export default FavouriteItemsPlaceholder;
