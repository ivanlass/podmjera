import React, { useContext, useEffect, useRef } from 'react';
import { Box, Text, Flex, Textarea, Grid, Button, useToast } from '@chakra-ui/react';
import ChooseLocation from './components/ChooseLocation';
import { useState } from 'react';
import ChoosePhoneNumber from './components/ChoosePhoneNumber';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetSpecificStore, useGetUser, useMakeOrder } from '../../../API/Queries';
import ChooseTimeOfArrival from './components/ChooseTimeOfArrival';
import { TimeArrivalOptions } from '../../../interfaces/general.interface';
import { BasketContext, BasketProvider } from '../../../store/Basket.Context';
import { useParams } from 'react-router-dom';
import ProductCardSm from '../../../components/ProductCardSm';
import { storeInterface } from '../../../interfaces/store.interface';

const BillingProcedureInner = () => {
  const toast = useToast();
  let { storeID } = useParams();
  const basketContext = useContext(BasketContext);
  const { user } = useAuth0();
  const { data: specificStore }: { data?: storeInterface } = useGetSpecificStore(storeID);
  const { mutate: createOrder } = useMakeOrder({
    onSuccess: (data: any) => {
      console.log(data);
      toast({
        title: 'Narudžba uspješno kreirana',
        description: 'Narudžba je uspješno kreirana i poslana na obradu, al dobit ces kurcinu',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
  });
  const { data: userMeta } = useGetUser(user?.sub);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedPhoneNumber, setSelectedphoneNumber] = useState<string>('');
  const [selectedTimeOfArrival, setSelectedTimeOfArrival] = useState<TimeArrivalOptions>(TimeArrivalOptions.Odmah);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // get basket from localStorage and basketTimestamp, if basketTimestamp is older than 36 hours, clear basket
    const basket = JSON.parse(localStorage.getItem('basket') || '[]');
    const basketTimestamp = localStorage.getItem('basketTimestamp');
    if (basketTimestamp) {
      const basketTimestampDate = new Date(Number(basketTimestamp));
      const now = new Date();
      const diff = now.getTime() - basketTimestampDate.getTime();
      const hours = Math.floor(diff / 1000 / 60 / 60);
      if (hours > 36) {
        localStorage.removeItem('basket');
        localStorage.removeItem('basketTimestamp');
      } else {
        if (basket.length > 0) {
          // loop through basket and check if every item storeID is the same as the current storeID
          // if not, clear basket
          basket.forEach((item: any) => {
            if (item.storeID !== storeID) {
              localStorage.removeItem('basket');
              localStorage.removeItem('basketTimestamp');
            }
          });
          const newBasket = JSON.parse(localStorage.getItem('basket') || '[]');
          basketContext?.setBasketFromLocalStorage(newBasket);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (userMeta?.adresses) {
      setSelectedAddress(userMeta?.adresses[0] || '');
    }
    if (userMeta?.phoneNumbers) {
      setSelectedphoneNumber(userMeta?.phoneNumbers[0] || '');
    }
  }, [userMeta]);

  const makeOrder = () => {
    const order = {
      storeID: storeID,
      userID: userMeta?._id,
      articles: basketContext?.basket,
      total: basketContext?.totalPrice,
      description: descriptionRef.current?.value,
      address: selectedAddress,
      phoneNumber: selectedPhoneNumber,
      timeOfArrival: selectedTimeOfArrival,
    };
    createOrder(order);
  };

  return (
    <Box mt={20} px='4'>
      <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={8}>
        <Box>
          <Box p={4} mb={8} bg='neutral.10' borderRadius='xl' boxShadow='md'>
            <ChoosePhoneNumber selectedPhoneNumber={selectedPhoneNumber} setSelectedPhoneNumber={setSelectedphoneNumber} />
          </Box>
          <Box p={4} mb={8} bg='neutral.10' borderRadius='xl' boxShadow='md'>
            <ChooseLocation selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
          </Box>
          <Box p={4} mb={8} bg='neutral.10' borderRadius='xl' boxShadow='md'>
            <ChooseTimeOfArrival selectedTimeOfArrival={selectedTimeOfArrival} setSelectedTimeOfArrival={setSelectedTimeOfArrival} />
          </Box>
          <Box p={4} mb={{ base: 0, md: 8 }} bg='neutral.10' borderRadius='xl' boxShadow='md'>
            <Text fontSize='2xl' fontWeight='bold'>
              Napomena
            </Text>
            <Text fontSize='sm' color='text.secondary'>
              Ukoliko imate napomenu za dostavljača, napišite je u polje ispod.
            </Text>
            <Text mb='4' fontSize='sm' color='text.secondary'>
              Na primjer "Crvena kuća sa drvenom ogradom".
            </Text>
            <Textarea ref={descriptionRef} placeholder='Napomena za dostavljača' maxLength={300} />
          </Box>
        </Box>
        {basketContext?.basket?.length! > 0 ? (
          <Box maxWidth={{ base: '100%', md: '100%' }}>
            <Box w='100%' p={4} bg='neutral.10' borderRadius='xl' boxShadow='md'>
              <Text fontSize='2xl' fontWeight='bold'>
                Narudžba
              </Text>
              <Text fontSize='sm' color='text.secondary'>
                Pregled narudžbe
              </Text>
              <Box mt='4' maxH='500px' overflow='auto'>
                {basketContext?.basket.map((item: any) => (
                  <ProductCardSm product={item} />
                ))}
              </Box>
              <Flex justifyContent='space-between' mt='4' mb='4'>
                <Text>Ukupna cijena artikala</Text>
                <Text fontWeight='bold'>{basketContext?.totalPrice?.toFixed(2)} KM</Text>
              </Flex>
              {specificStore?.deliveryFee && (
                <Flex justifyContent='space-between' mt='4' mb='4'>
                  <Text>Cijena dostave</Text>
                  <Text fontWeight='bold'>{specificStore?.deliveryFee?.toFixed(2)} KM</Text>
                </Flex>
              )}
              {basketContext && basketContext?.totalPrice > 0 && specificStore?.deliveryFee && (
                <Flex justifyContent='space-between' mt='4' mb='4'>
                  <Text>Total</Text>
                  <Text fontWeight='bold'>{(Number(specificStore?.deliveryFee) + basketContext?.totalPrice).toFixed(2)} KM</Text>
                </Flex>
              )}
              <Button onClick={makeOrder} w='100%' colorScheme='primary' size='lg'>
                Naruči
              </Button>
            </Box>
          </Box>
        ) : null}
      </Grid>
    </Box>
  );
};

function BillingProcedure() {
  return (
    <BasketProvider>
      <BillingProcedureInner />
    </BasketProvider>
  );
}

export default BillingProcedure;
