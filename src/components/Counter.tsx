import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { SmallAddIcon, MinusIcon } from '@chakra-ui/icons';
import { useContext, FC } from 'react';
import { BasketContext } from '../store/Basket.Context';

interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface IProps {
  product: IProduct;
}

const Counter: FC<IProps> = ({ product }: IProps) => {
  const basketContext = useContext(BasketContext);

  return (
    <Box bg='primary.500' borderRadius='xl'>
      {basketContext?.productQuantity(product.id) === undefined || basketContext?.productQuantity(product.id) > 0 ? (
        <Flex alignItems='center'>
          <IconButton aria-label='minus' size='sm' onClick={() => basketContext?.decreaseQuantity(product)} icon={<MinusIcon />} />

          <Text px='4' fontWeight='bold' color='primary.800'>
            {basketContext?.productQuantity(product.id)}
          </Text>
          <IconButton size='sm' aria-label='plus' onClick={() => basketContext?.increaseQuantity(product)} icon={<SmallAddIcon fontSize='2xl' />} />
        </Flex>
      ) : (
        <IconButton size='sm' aria-label='plus' onClick={() => basketContext?.increaseQuantity(product)} icon={<SmallAddIcon fontSize='2xl' />} />
      )}
    </Box>
  );
};

export default Counter;
