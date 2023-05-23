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
    <Card key={product._id} bg='neutral.10' overflow='hidden' borderRadius='xl' boxShadow='md' _hover={{ boxShadow: 'xl' }}>
      <Box display='flex' alignItems={{ base: 'center', lg: 'flex-start' }} flexDirection={{ base: 'column', lg: 'column' }}>
        <Image
          src={product.image}
          alt='mlijeko'
          height={{ base: '180px', md: '250px' }}
          w='100%'
          objectFit='cover'
          bgPosition='center'
          fallback={<Icon as={CiApple} boxSize={{ base: '4rem', md: '8rem' }} color='primary.500' height={{ base: '180px', md: '250px' }} alignSelf='center' />}
        />
        <Box bottom='0' w='100%'>
          <Box p={{ base: '2', md: '4' }} display='flex' flexDir='column' justifyContent='space-between'>
            <Text textTransform='capitalize' fontSize={{ base: 'sm', md: 'lg' }} color='text.primary' fontWeight='light'>
              {product.name}
            </Text>
            <Box pt='2' display='flex' justifyContent='space-between' alignItems='flex-end' flexDir={{ base: 'column', md: 'row' }}>
              <Text color='text.secondary' fontSize={{ base: 'sm', md: 'md' }} fontWeight='thin' alignSelf='flex-start'>
                {product.price} KM / {product.perPiece ? 'komad' : 'kg'}
              </Text>
            </Box>
            <Flex justifyContent='flex-end' mt='2'>
              <Counter product={product} />
            </Flex>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard;
