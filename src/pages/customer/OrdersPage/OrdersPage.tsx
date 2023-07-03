import React, { useEffect } from 'react';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Text, useToast } from '@chakra-ui/react';
import { useGetMyOrders, useGetUser } from '../../../API/Queries';
import FullpageSpinner from '../../../components/FullPageSpinner';
import { ordersInterface } from '../../../interfaces/orders.interface';
import { useParams } from 'react-router-dom';

const OrdersPage = () => {
  const toast = useToast();
  let { newOrder } = useParams();
  const { data: userMeta } = useGetUser();
  const {
    data: myOrders,
    isLoading,
    isError,
  } = useGetMyOrders(userMeta?._id, {
    enabled: !!userMeta?._id,
  });

  useEffect(() => {
    if (newOrder && newOrder === 'true') {
      toast({
        title: 'Uspješno ste izvršili narudžbu',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }
  }, []);

  if (isLoading) {
    return <FullpageSpinner />;
  }

  if (isError) {
    return (
      <Flex w='100vw' px='4' justifyContent='center' alignItems='center' h='100vh'>
        <Text fontWeight='bold' fontSize='2xl'>
          Dogodila se greška, molimo pokušajte kasnije.
        </Text>
      </Flex>
    );
  }

  return (
    <Box mt={20} px='4'>
      <Text>Narudžbe</Text>
      <Accordion allowToggle>
        {myOrders?.map((order: ordersInterface) => (
          <AccordionItem key={order._id} bg='neutral.10' borderRadius='md' boxShadow='md' mb='4'>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                Broj narudžbe: {order._id}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text>
                Datum narudžbe:{' '}
                {new Date(order.createdAt).toLocaleString('de-DE', {
                  timeZone: 'Europe/Sarajevo',
                  hour12: false,
                })}
              </Text>
              <Text>Ukupna cijena: {order.total} KM</Text>
              <Text>Status: {order.status}</Text>
            </AccordionPanel>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Artikli
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Box mt='2'>
                  {order.articles.map((item) => (
                    <Flex key={item._id} justifyContent='space-between' alignItems='center' mb='2'>
                      <Text>{item.name}</Text>
                      <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Text mr='2'>{item.quantity}</Text>
                        <Text fontSize='sm' mr='2' color='neutral.100'>
                          X
                        </Text>
                        <Text>{item.price} KM</Text>
                      </Box>
                    </Flex>
                  ))}
                </Box>
              </AccordionPanel>
            </AccordionItem>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
};

export default OrdersPage;
