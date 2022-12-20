import {
  Box,
  FormLabel,
  Heading,
  Input,
  Text,
  Button,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import CategoryCard from './components/CategoryCard';

const Categories = () => {
  return (
    <Box p='4'>
      <Heading>Kategorije</Heading>
      <Box
        mt={4}
        w={{ base: '100%', lg: '40%' }}
        bg='neutral.10'
        p='4'
        borderRadius='md'
        boxShadow='base'
      >
        <Text fontSize='xl' fontWeight='bold'>
          Nova kategorija
        </Text>
        <FormLabel mt='4'>Naziv</FormLabel>
        <Input placeholder='Naziv nove kategorije' />
        <Flex mt='4' justifyContent='flex-end'>
          <Button>Spremi novu kategoriju</Button>
        </Flex>
      </Box>
      <SimpleGrid mt='8' columns={{ base: 1, md: 4, xl: 6 }} spacing={4}>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </SimpleGrid>
    </Box>
  );
};

export default Categories;
