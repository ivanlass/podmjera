import { Box, Flex } from '@chakra-ui/react';

interface Ilist {
  name: string;
  price: number;
}
interface BestListProps {
  list: Ilist[];
}

const BestList = ({ list }: BestListProps) => {
  return (
    <Box h='300px' w='100%' overflowY='auto' p='4' bg='neutral.10' boxShadow='md' borderRadius='xl' mb='4'>
      {list.map((item: Ilist) => (
        <Flex key={item.name} justifyContent='space-between' borderBottom='1px solid' borderColor='neutral.50' p='2'>
          <Box>{item.name}</Box>
          <Box>{item.price}</Box>
        </Flex>
      ))}
    </Box>
  );
};

export default BestList;
