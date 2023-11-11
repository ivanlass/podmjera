import React, { useRef } from 'react';
import { Button, GridItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, useToast } from '@chakra-ui/react';
import Details from './components/Details';
import OrdersTable from './components/OrdersTable';
import { ordersInterface } from '../../interfaces/orders.interface';
import { reversedOrderStatus } from '../../interfaces/general.interface';
import { useChangeOrderStatus } from '../../API/Queries';
import { useQueryClient } from '@tanstack/react-query';

interface EditItemProps {
  isOpen: boolean;
  onClose: () => void;
  order: ordersInterface;
}

const OrderDetailsForOwner = ({ isOpen, onClose, order }: EditItemProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const selectedStatusRef = useRef<HTMLSelectElement | null>(null);
  const { mutate: changeOrderStatus } = useChangeOrderStatus({
    onSuccess: (order: ordersInterface) => {
      toast({
        title: 'Status narudžbe je uspješno promijenjen',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
      queryClient.setQueryData(['storeOrders'], (oldData: any) => {
        const updatedData = oldData.map((oldOrder: ordersInterface) => {
          if (oldOrder._id === order._id) {
            return order; // Replace the entire object
          }
          return oldOrder;
        });

        return updatedData;
      });
    },
    onError: () => {
      toast({
        title: 'Došlo je do greške',
        description: 'Status narudžbe nije promijenjen, molimo pokušajte ponovo.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const changeOrderStatusHandler = () => {
    if (!selectedStatusRef?.current?.value) return;
    if (selectedStatusRef?.current?.value === order.status) return;

    changeOrderStatus({ storeID: order.storeID, orderID: order._id, status: reversedOrderStatus[selectedStatusRef?.current?.value] });
  };

  return (
    <Modal size='full' isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{order.address}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={12} spacing={4}>
            <GridItem colStart={1} colEnd={{ base: 13, lg: 9 }}>
              <OrdersTable order={order} />
            </GridItem>
            <GridItem colStart={{ base: 1, lg: 9 }} colEnd={13}>
              <Details order={order} selectedStatusRef={selectedStatusRef} />
            </GridItem>
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' onClick={onClose}>
            Zatvori
          </Button>
          <Button onClick={changeOrderStatusHandler}>Spremi</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderDetailsForOwner;
