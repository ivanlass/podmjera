import {
  Box,
  Heading,
  Input,
  Text,
  Button,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import ItemTable from './components/ItemTable';

const Items = () => {
  return (
    <Box p='4'>
      <Heading>Artikli</Heading>
      <Box
        mt={4}
        w={{ base: '100%', lg: 'fit-content' }}
        bg='neutral.10'
        p='4'
        borderRadius='md'
        boxShadow='base'
      >
        <Text fontSize='xl' fontWeight='bold'>
          Nova kategorija
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Box>
            <Input placeholder='Ime artikla' />
          </Box>
          <Box>
            <Input placeholder='Kategorija' />
          </Box>
          <Box>
            <Input placeholder='cijena' />
          </Box>
          <Box>
            <Input placeholder='Slika' />
          </Box>
        </SimpleGrid>
        <Flex mt='4' justifyContent='flex-end'>
          <Button>Spremi novu kategoriju</Button>
        </Flex>
      </Box>
      <ItemTable />
    </Box>
  );
};

export default Items;
