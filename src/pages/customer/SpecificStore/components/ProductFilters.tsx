import { Flex, Input } from '@chakra-ui/react';

const ProductFilters = () => {
  return (
    <Flex position='fixed' top={6} zIndex={101} left='50%' transform='translate(-50%, 0)' flexDir='column' alignItems='center' bg='primary.500' borderBottomRadius='xl' p='4' boxShadow='md'>
      <Input placeholder='Pretraga' w='fit-content' bg='neutral.10'/>
    </Flex>
  );
};

export default ProductFilters;
