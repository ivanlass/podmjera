import { Box, Flex, Heading } from '@chakra-ui/react';
import ItemTable from './components/ItemTable';
import NewItemForm from './components/NewItemForm';

const Items = () => {
  return (
    <Box mt={12}>
      <Heading>Artikli</Heading>
      <Flex justifyContent='center'>
        <NewItemForm />
      </Flex>
      <ItemTable />
    </Box>
  );
};

export default Items;
