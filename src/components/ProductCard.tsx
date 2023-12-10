import { Text, Box, Card, Image, Icon, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import Counter from './Counter';
import { articlesInterface } from '../interfaces/articles.interface';
import { CiApple } from 'react-icons/ci';

interface IProps {
  product: articlesInterface;
}

const ProductCard: FC<IProps> = ({ product }: IProps) => {
  return (
    <Card key={product._id} bg='neutral.10' overflow='hidden' borderRadius='xl' boxShadow='none' _hover={{ boxShadow: 'md' }}>
      <Box height='100%' display='flex' alignItems={{ base: 'center', lg: 'flex-start' }} flexDirection={{ base: 'column', lg: 'column' }}>
        <Image
          src={product.image}
          alt='mlijeko'
          height={{ base: '180px', md: '200px' }}
          w='100%'
          objectFit='cover'
          bgPosition='center'
          fallback={<Icon as={CiApple} boxSize={{ base: '4rem', md: '6rem' }} color='primary.500' height={{ base: '180px', md: '200px' }} alignSelf='center' />}
        />
        <Box height='100%' w='100%' p={{ base: '2', md: '4' }} display='flex' flexDir='column'>
          <Text textTransform='capitalize' fontSize='md' color='text.secondary' fontWeight='700'>
            {product.name}
          </Text>
          <Box pt='2' display='flex' justifyContent='space-between' alignItems='flex-end' flexDir={{ base: 'column', md: 'row' }}>
            <Text color='primary.700' fontSize='sm' alignSelf='flex-start'>
              {product.price} KM / {product.perPiece ? 'komad' : 'kg'}
            </Text>
          </Box>
          <Flex justifyContent='flex-end' w='100%' mt='auto'>
            <Counter product={product} />
          </Flex>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard;
