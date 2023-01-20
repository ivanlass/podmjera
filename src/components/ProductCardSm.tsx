import { FC, useContext } from 'react';
import { Text, Box, Stack, Image, Flex, IconButton } from '@chakra-ui/react';
import Counter from './Counter';
import { AiOutlineClose } from 'react-icons/ai';
import { BasketContext } from '../store/Basket.Context';

interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface IProps {
  product: IProduct;
}

const ProductCardSm: FC<IProps> = ({ product }: IProps) => {
  const basketContext = useContext(BasketContext);

  return (
    <Box display='flex' py='4'>
      <Image
        src={product.image}
        alt='mlijeko'
        borderRadius='md'
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
      <Flex
        ml='auto'
        flexDir='column'
        alignItems='flex-end'
        justifyContent='space-between'
      >
        <Counter product={product} />
        <Text fontSize='sm' color='text.secondary'>
          {product.price * product.quantity} KM
        </Text>
      </Flex>
      <IconButton
        variant='outline'
        size='xs'
        borderRadius='full'
        ms='4'
        icon={<AiOutlineClose />}
        aria-label='delete'
        onClick={() => basketContext?.removeFromBasket(product.id)}
      />
    </Box>
  );
};

export default ProductCardSm;
