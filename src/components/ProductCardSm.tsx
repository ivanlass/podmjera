import { FC, useContext } from 'react';
import { Text, Box, Stack, Image, Flex, IconButton, Icon } from '@chakra-ui/react';
import Counter from './Counter';
import { AiOutlineClose } from 'react-icons/ai';
import { BasketContext } from '../store/Basket.Context';
import { articlesInterface } from '../interfaces/articles.interface';
import { CiApple } from 'react-icons/ci';

interface IProps {
  product: articlesInterface;
}

const ProductCardSm: FC<IProps> = ({ product }: IProps) => {
  const basketContext = useContext(BasketContext);

  return (
    <Box display='flex' py='4'>
      <Image
        src={product.image}
        fallback={<Icon as={CiApple} boxSize={{ base: '2rem', md: '4rem' }} color='primary.500' height={{ base: '20px', md: '50px' }} alignSelf='center' />}
        alt='mlijeko'
        borderRadius='xl'
        height='60px'
        objectFit='contain'
        bgPosition='center'
      />
      <Stack justifyContent='space-between' ms='4'>
        <Text color='primary.700' fontSize={{ base: 'md', md: 'xl' }}>
          {product.price} KM
        </Text>
        <Text fontSize='sm' color='text.secondary'>
          {product.name}
        </Text>
      </Stack>
      <Flex ml='auto' flexDir='column' alignItems='flex-end' justifyContent='space-between'>
        <Counter product={product} />
        <Text fontSize='sm' color='text.secondary'>
          {(product.price * product.quantity).toFixed(2)} KM
        </Text>
      </Flex>
      <IconButton
        variant='outline'
        size='xs'
        borderRadius='full'
        ms='4'
        icon={<AiOutlineClose />}
        aria-label='delete'
        onClick={() => basketContext?.removeFromBasket(product._id)}
      />
    </Box>
  );
};

export default ProductCardSm;
