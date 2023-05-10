// import { Text, Box, Card, CardBody, Image, Flex } from '@chakra-ui/react';
// import { FC } from 'react';
// import Counter from './Counter';

// interface IProduct {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
// }

// interface IProps {
//   product: IProduct;
// }

// const ProductCard: FC<IProps> = ({ product }: IProps) => {
//   return (
//     <Card bg='neutral.10'>
//       <CardBody p='4'>
//         <Box w='100%' display='flex' alignItems={{ base: 'center', lg: 'flex-start' }} flexDirection={{ base: 'column', lg: 'row' }}>
//           <Image src={product.image} alt='mlijeko' borderRadius='xl' height='150px' width='150px' objectFit='cover' bgPosition='center' />

//           <Flex flexDirection='column' justifyContent='space-between' ms={{ base: 0, lg: 2 }} mt={{ base: 2, lg: 0 }} h={{ base: '100%', lg: '150px' }} w='100%'>
//             <Box>
//               <Text color='primary.700' fontSize={{ base: 'md', md: 'xl' }}>
//                 {product.price} KM
//               </Text>
//               <Text fontSize='sm' color='text.secondary'>
//                 {product.name}
//               </Text>
//             </Box>
//             <Flex mt={{ base: 4, lg: 0 }} justifyContent='flex-end' justifySelf='flex-end'>
//               <Counter product={product} />
//             </Flex>
//           </Flex>
//         </Box>
//       </CardBody>
//     </Card>
//   );
// };

// export default ProductCard;

import { Text, Box, Card, Image, Icon } from '@chakra-ui/react';
import { FC } from 'react';
import Counter from './Counter';
import { articlesInterface } from '../interfaces/articles.interface';
import { CiApple } from 'react-icons/ci';

interface IProps {
  product: articlesInterface;
}

const ProductCard: FC<IProps> = ({ product }: IProps) => {
  return (
    <Card bg='neutral.10' overflow='hidden' borderRadius='xl' boxShadow='md' _hover={{ boxShadow: 'xl' }}>
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
              <Counter product={product} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default ProductCard;
