import { Box, Heading, useToast } from '@chakra-ui/react';
import OrdersList from './components/OrdersList';
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useGetStore, useGetUser } from '../../../API/Queries';
import { useAuth0 } from '@auth0/auth0-react';
import bell from '../../../assets/bell.mp3';

const socket = io('http://localhost:6060');

const Orders = () => {
  const toast = useToast();
  const audio = new Audio(bell);
  const { user } = useAuth0();
  const { data: userMeta } = useGetUser(user?.sub);
  const { data: store } = useGetStore(userMeta?._id, {
    enabled: false,
  });
  useEffect(() => {
    if (store) {
      // Subscribe to the store owner's channel or room
      socket.emit('subscribe', store._id);
      // Listen for new order events
      socket.on('newOrder', (order) => {
        // Handle the new order received
        console.log('New order:', order);
        audio.currentTime = 0;
        audio.play();
        console.log(order);
        toast({
          title: 'Nova narudžba',
          description: `Imate novu narudžbu`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      });

      // Clean up the socket connection
      return () => {
        socket.disconnect();
      };
    }
  }, [store]);

  return (
    <Box mt={12}>
      <Heading>Narudžbe</Heading>
      <OrdersList />
    </Box>
  );
};

export default Orders;
