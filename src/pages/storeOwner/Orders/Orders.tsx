import { Box, Heading, useToast } from '@chakra-ui/react';
import OrdersList from './components/OrdersList';
import React, { useEffect } from 'react';
import io from 'socket.io-client';
import { useGetStore, useGetUser } from '../../../API/Queries';
import { useAuth0 } from '@auth0/auth0-react';
import bell from '../../../assets/bell.mp3';
import { useGetStoreOrders } from '../../../API/Queries';
import { useQueryClient } from '@tanstack/react-query';

const socket = io('http://localhost:6060');

const Orders = () => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const audio = new Audio(bell);
  const { user } = useAuth0();
  const { data: userMeta } = useGetUser(user?.sub);
  const { data: store } = useGetStore(userMeta?._id, {
    enabled: false,
  });
  const { data: storeOrders } = useGetStoreOrders(store?._id, userMeta?._id, {
    enabled: !!store?._id && !!userMeta?._id,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (store) {
      // Subscribe to the store owner's channel or room
      socket.emit('subscribe', store._id);
      // Listen for new order events
      socket.on('newOrder', (order) => {
        // Handle the new order received
        audio.currentTime = 0;
        audio.play();
        queryClient.setQueryData(['storeOrders'], (old: any) => [...old, order]);

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
    <Box mt={{ base: 0, md: 12 }}>
      <Heading>Narudžbe</Heading>
      {storeOrders?.length > 0 && (
        <Heading fontSize='md' color='gray.500'>
          {storeOrders?.length} narudžbi u posljednjih 30 dana
        </Heading>
      )}

      <OrdersList orders={storeOrders} />
    </Box>
  );
};

export default Orders;
