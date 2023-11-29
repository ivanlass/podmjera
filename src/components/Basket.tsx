import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, Text, DrawerHeader, DrawerBody, DrawerFooter, Box, Flex } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import { BsBasket } from 'react-icons/bs';
import { BasketContext } from '../store/Basket.Context';
import ProductCardSm from './ProductCardSm';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetSpecificStore } from '../API/Queries';
import { storeInterface } from '../interfaces/store.interface';
import { useAuth0 } from '@auth0/auth0-react';
import { createPath, ROUTE } from '../interfaces/routes.interface';

function Basket() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const basketContext = useContext(BasketContext);
  let { storeID } = useParams();
  const { data: specificStore }: { data?: storeInterface } = useGetSpecificStore(storeID);
  const { user, loginWithPopup } = useAuth0();

  const login = async () => {
    loginWithPopup();
  };

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

  return (
    <>
      <Box w='100%' textAlign={{ md: 'right' }}>
        <Button
          onClick={onOpen}
          position={{ base: 'static', md: 'fixed' }}
          size='null'
          p='2'
          borderRadius={{ base: 'md', md: 'full' }}
          zIndex={10}
          right='32'
          top='7'
          variant={{ base: 'ghost', md: 'unset' }}
          transform={{ base: 'translateY(0)', md: 'translateY(-50%)' }}
        >
          {basketContext?.basket && basketContext?.basket.length > 0 && (
            <Text
              fontSize='xs'
              position='absolute'
              top='-6px'
              right='-10px'
              p='3px'
              borderRadius='full'
              minW='22px'
              minH='22px'
              border='1px solid white'
              color='text.primary'
              bg='primary.500'
            >
              {basketContext.basket.length}
            </Text>
          )}
          <BsBasket fontSize='20' />
        </Button>
      </Box>

      <Drawer size={'md'} isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Vaša korpa</DrawerHeader>

          <DrawerBody position='relative' bg='neutral.30'>
            {basketContext?.basket && basketContext?.basket.length > 0 ? (
              basketContext.basket.map((product) => (
                <Box key={product._id}>
                  <ProductCardSm key={product._id} product={product} />
                </Box>
              ))
            ) : (
              <Text textAlign='center' color='gray.500'>
                Korpa je prazna
              </Text>
            )}
          </DrawerBody>
          <DrawerFooter display='block' borderTop='1px solid' borderColor='primary.500'>
            <Flex justifyContent='space-between' mt={{ base: 2, md: 4 }} mb={{ base: 2, md: 4 }}>
              <Text color='text.primary'>Ukupna cijena artikala</Text>
              <Text color='text.primary'>{basketContext?.totalPrice?.toFixed(2)} KM</Text>
            </Flex>
            {specificStore?.deliveryFee && (
              <Flex justifyContent='space-between' mt={{ base: 2, md: 4 }} mb={{ base: 2, md: 4 }}>
                <Text color='text.primary'>Cijena dostave</Text>
                <Text color='text.primary'>{Number(basketContext?.totalPrice) > Number(specificStore?.freeDelivery) ? 0 : specificStore?.deliveryFee?.toFixed(2)} KM</Text>
              </Flex>
            )}
            {basketContext && basketContext?.totalPrice > 0 && specificStore?.deliveryFee && (
              <Flex justifyContent='space-between' mt={{ base: 4, md: 8 }} mb='4'>
                <Text fontWeight='bold' fontSize='xl' color='text.secondary'>
                  Total
                </Text>
                {Number(basketContext?.totalPrice) > Number(specificStore.freeDelivery) ? (
                  <Text fontWeight='bold' fontSize='xl' color='text.secondary'>
                    {basketContext?.totalPrice.toFixed(2)} KM
                  </Text>
                ) : (
                  <Text fontWeight='bold' fontSize='xl'>
                    {(Number(specificStore?.deliveryFee) + basketContext?.totalPrice).toFixed(2)} KM
                  </Text>
                )}
              </Flex>
            )}
            {Number(basketContext?.totalPrice) <= Number(specificStore?.minimalOrder) && (
              <Text textAlign='center' color='red.500'>
                Minimalna narudzba je {specificStore?.minimalOrder} KM
              </Text>
            )}
            <Flex justifyContent='flex-end'>
              <Button variant='outline' mr={3} onClick={onClose}>
                Zatvori
              </Button>
              {storeID && basketContext && user && (
                <Button
                  onClick={() =>
                    navigate(
                      createPath({
                        path: ROUTE.NAPLATA,
                        params: { storeID: storeID! },
                      })
                    )
                  }
                  disabled={Number(basketContext?.totalPrice) <= Number(specificStore?.minimalOrder)}
                  colorScheme='blue'
                >
                  Kupi
                </Button>
              )}
              {!user && <Button onClick={login}>Login</Button>}
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Basket;
