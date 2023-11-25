import { FC, useContext } from 'react';
import { Text, Box, Stack, Image, Flex, IconButton, Icon, Tooltip } from '@chakra-ui/react';
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
    <Box display='flex' py='4' position='relative' bg='neutral.10' borderRadius='md' p='4' my={{ base: 6, md: 4 }} flexWrap={{ base: 'wrap', md: 'nowrap' }}>
      <Image
        src={product.image}
        fallback={<Icon as={CiApple} boxSize='3rem' color='primary.500' bg='neutral.30' borderRadius='full' height='50px' alignSelf='center' />}
        alt='mlijeko'
        borderRadius='xl'
        height='50px'
        objectFit='contain'
        bgPosition='center'
      />
      <Stack justifyContent='space-between' ms='4'>
        <Tooltip label={product.name}>
          <Text fontSize='sm' fontWeight={700} color='text.primary' whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' w={{ base: '80px', md: '180px' }}>
            {product.name}
          </Text>
        </Tooltip>
        <Text color='text.secondary' fontSize='sm'>
          {product.price} KM
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
        position={{ base: 'absolute', md: 'relative' }}
        top='-10px'
        left='-20px'
        bg='neutral.10'
        onClick={() => basketContext?.removeFromBasket(product._id)}
      />
    </Box>
  );
};

export default ProductCardSm;
