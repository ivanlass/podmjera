import { Box, Heading } from '@chakra-ui/react';
import OrdersList from './components/OrdersList';

const Orders = () => {
  return (
    <Box p='4'>
      <Heading>Narudžbe</Heading>
      <OrdersList />
    </Box>
  );
};

export default Orders;
