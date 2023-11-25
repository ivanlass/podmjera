import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { SmallAddIcon, MinusIcon } from '@chakra-ui/icons';
import { useContext, FC } from 'react';
import { BasketContext } from '../store/Basket.Context';
import { articlesInterface } from '../interfaces/articles.interface';

interface IProps {
  product: articlesInterface;
}

const Counter: FC<IProps> = ({ product }: IProps) => {
  const basketContext = useContext(BasketContext);

  return (
    <Box bg='primary.500' borderRadius='xl' w={{ base: basketContext && basketContext?.productQuantity(product._id) > 0 ? '100%' : 'fit-content', md: 'auto' }}>
      {basketContext?.productQuantity(product._id) === undefined || basketContext?.productQuantity(product._id) > 0 ? (
        <Flex alignItems='center' justifyContent='space-between'>
          <IconButton aria-label='minus' size='sm' onClick={() => basketContext?.decreaseQuantity(product)} icon={<MinusIcon />} />

          <Text px='4' fontSize={{ base: 'sm', md: 'md' }} fontWeight='bold' color='primary.800'>
            {basketContext?.productQuantity(product._id)} {product.perPiece ? 'kom' : 'kg'}
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
