import { Text, Box, Card, CardBody, Image, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import Counter from './Counter';

interface IProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface IProps {
  product: IProduct;
}

const ProductCard: FC<IProps> = ({ product }: IProps) => {
  return (
    <Card bg='neutral.10'>
      <CardBody p='4'>
        <Box w='100%' display='flex' alignItems={{ base: 'center', lg: 'flex-start' }} flexDirection={{ base: 'column', lg: 'row' }}>
          <Image src={product.image} alt='mlijeko' borderRadius='md' height='150px' objectFit='cover' bgPosition='center' />

          <Flex flexDirection='column' justifyContent='space-between' ms={{ base: 0, lg: 2 }} mt={{ base: 2, lg: 0 }} h={{ base: '100%', lg: '150px' }} w='100%'>
            <Box>
              <Text color='primary.700' fontSize={{ base: 'md', md: 'xl' }}>
                {product.price} KM
              </Text>
              <Text fontSize='sm' color='text.secondary'>
                {product.name}
              </Text>
            </Box>
            <Flex mt={{ base: 4, lg: 0 }} justifyContent='flex-end' justifySelf='flex-end'>
              <Counter product={product} />
            </Flex>
          </Flex>
        </Box>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
