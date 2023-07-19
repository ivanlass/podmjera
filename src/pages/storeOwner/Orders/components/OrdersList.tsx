import React from 'react';
import { Table, TableContainer, Tbody, Td, Avatar, Th, Button, Thead, Tr, IconButton, useDisclosure, Flex, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import OrderDetailsForOwner from '../../../../modals/OrderDetailsForOwner/OrderDetailsForOwner';
import { ordersInterface } from '../../../../interfaces/orders.interface';
import { orderStatus } from '../../../../interfaces/general.interface';

interface Props {
  orders: ordersInterface[];
}

const OrdersList = ({ orders }: Props) => {
  const [selectedOrder, setSelectedOrder] = React.useState<ordersInterface | null>(null);
  const { isOpen: isOpenOrderDetails, onOpen: onOpenOrderDetails, onClose: onCloseOrderDetails } = useDisclosure();

  const handleOpenOrderDetails = (order: ordersInterface) => {
    setSelectedOrder(order);
    onOpenOrderDetails();
  };

  return (
    <TableContainer bg='neutral.10' borderRadius='xl' boxShadow='md' mt='4'>
      <Table variant='unstyled'>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Adresa</Th>
            <Th>Cijena</Th>
            <Th>Datum</Th>
            <Th>Status</Th>
            <Th>Vrijeme isporuke</Th>
            <Th>Opcije</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders &&
            orders.length > 0 &&
            orders.map((order: ordersInterface, index) => (
              <Tr key={order._id} _hover={{ bg: 'neutral.20' }}>
                <Td>
                  <Flex alignItems='center'>
                    <Avatar me={4} src={order.picture && order.picture} />
                    Marko Markovic
                  </Flex>
                </Td>
                <Td>{order.address}</Td>
                <Td>
                  <Text display='inline-block' fontWeight='bold'>
                    {Number(order.total).toFixed(2)}
                  </Text>
                  <Text ml='1' display='inline-block'>
                    KM
                  </Text>
                </Td>
                <Td>{new Date(order.createdAt).toLocaleString('de-DE')}</Td>
                <Td>{orderStatus[order.status]}</Td>
                <Td>{order.timeOfArrival}</Td>
                <Td>
                  <Button variant='ghost' onClick={() => handleOpenOrderDetails(order)}>
                    Otvori
                  </Button>
                  <IconButton ms='4' fontSize='xl' variant='ghost' aria-label='delete' icon={<DeleteIcon />} />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      {selectedOrder && <OrderDetailsForOwner isOpen={isOpenOrderDetails} onClose={onCloseOrderDetails} order={selectedOrder} />}
    </TableContainer>
  );
};

export default OrdersList;
