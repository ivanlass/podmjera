import { Tr } from '@chakra-ui/react';
import type { FC } from 'react';
import { useDrag } from 'react-dnd';

export const ItemTypes = {
  BOX: 'box',
};
export interface BoxProps {
  name: string;
  children: React.ReactNode;
}

interface DropResult {
  name: string;
}

const FavouriteItem: FC<BoxProps> = function Box({ name, children }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;
  return (
    <Tr cursor='move' ref={drag} style={{ opacity }}>
      {children}
    </Tr>
  );
};

export default FavouriteItem;
