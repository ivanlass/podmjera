import {
  Text,
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Stack,
  Image,
} from '@chakra-ui/react';
import Counter from './Counter';

const ItemCard = () => {
  return (
    <Card bg='neutral.10'>
      <CardBody>
        <Box display='flex' justifyContent='center'>
          <Image
            src='https://www.konzumshop.ba/images/products/022/02230013_1l.gif'
            alt='mlijeko'
            borderRadius='md'
            height={{ base: '100px', md: '150px' }}
            objectFit='contain'
            bgPosition='center'
          />
        </Box>
        <Stack mt='4'>
          <Text color='primary.700' fontSize={{ base: 'md', md: 'xl' }}>
            3.27 KM
          </Text>
          <Text fontSize='sm' color='text.secondary'>
            Meggle Mlijeko 2.8%
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter justifyContent={{ base: 'center', md: 'flex-end' }}>
        <Counter />
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
