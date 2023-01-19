import {
  Text,
  Box,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Stack,
  Image,
  Flex,
  Button,
  IconButton,
} from '@chakra-ui/react';
import Counter from './Counter';
import { AiOutlineClose } from 'react-icons/ai';

const ProductCardSm = () => {
  return (
    <Box display='flex' py='4'>
      <Image
        src='https://www.konzumshop.ba/images/products/022/02230013_1l.gif'
        alt='mlijeko'
        borderRadius='md'
        height='60px'
        objectFit='contain'
        bgPosition='center'
      />
      <Stack justifyContent='space-between' ms='4'>
        <Text color='primary.700' fontSize={{ base: 'md', md: 'xl' }}>
          3.27 KM
        </Text>
        <Text fontSize='sm' color='text.secondary'>
          Meggle Mlijeko 2.8%
        </Text>
      </Stack>
      <Flex
        ml='auto'
        flexDir='column'
        alignItems='flex-end'
        justifyContent='space-between'
      >
        <Counter />
        <Text fontSize='sm' color='text.secondary'>
          15 KM
        </Text>
      </Flex>
      <IconButton
        variant='outline'
        size='xs'
        borderRadius='full'
        ms='4'
        icon={<AiOutlineClose />}
        aria-label='delete'
      />
    </Box>
  );
};

export default ProductCardSm;
