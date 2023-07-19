import React, { forwardRef } from 'react';
import { Box, Flex, Select, Text } from '@chakra-ui/react';
import { ordersInterface } from '../../../interfaces/orders.interface';
import { useGetSpecificStore } from '../../../API/Queries';
import { orderStatus } from '../../../interfaces/general.interface';

interface Props {
  order: ordersInterface;
  selectedStatusRef: React.MutableRefObject<HTMLSelectElement | null>;
}

const Details = ({ order, selectedStatusRef }: Props) => {
  const { data: store } = useGetSpecificStore(order.storeID);
  return (
    <Flex flexDirection='column' justifyContent='space-between' p='4' bg='neutral.10' borderRadius='xl' boxShadow='md' h='100%'>
      <Box>
        <Text color='text.secondary' fontSize='sm'>
          Adresa
        </Text>
        <Text fontWeight='bold'>{order.address}</Text>
        {order.description && (
          <>
            <Text color='text.secondary' fontSize='sm'>
              Detalji
            </Text>
            <Text mb={4}>{order.description}</Text>
          </>
        )}
      </Box>

      <Select mt={8} borderColor='primary.500' ref={selectedStatusRef}>
        {Object.entries(orderStatus).map(([statusKey, statusValue]) => (
          <option key={statusKey} defaultValue={statusKey} selected={statusKey === order.status}>
            {statusValue}
          </option>
        ))}
      </Select>

      <Box borderTop='1px solid' borderColor='primary.500' marginTop={8}>
        <Flex justifyContent='space-between' my={4}>
          <Text>Cijena</Text>
          <Text>{order.total} KM</Text>
        </Flex>
        <Flex justifyContent='space-between' my={4}>
          {store?.deliveryFee && (
            <>
              <Text>Cijena dostave</Text>
              <Text fontWeight='bold'>{Number(order.total) > Number(store?.freeDelivery) ? 0 : store?.deliveryFee?.toFixed(2)} KM</Text>
            </>
          )}
        </Flex>
        <Flex justifyContent='space-between' my={4}>
          <Text>Ukupno</Text>
          <Text fontSize='xl' fontWeight='bold'>
            {(Number(order.total) + Number(Number(order.total) > Number(store?.freeDelivery) ? 0 : store?.deliveryFee?.toFixed(2))).toFixed(2)} KM
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Details;
