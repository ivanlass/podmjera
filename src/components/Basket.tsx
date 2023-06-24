import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, Text, DrawerHeader, DrawerBody, DrawerFooter, Box, Flex } from '@chakra-ui/react';
import React, { useContext } from 'react';
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

  console.log(storeID);
  const login = async () => {
    loginWithPopup();
  };

  return (
    <>
      <Box w='100%' textAlign='right'>
        <Button
          onClick={onOpen}
          position='fixed'
          size='null'
          p='2'
          borderRadius='full'
          zIndex={10}
          right={{ base: '50%', md: 32 }}
          top={{ base: 'none', md: '2' }}
          transform='translate(50%)'
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
          <DrawerHeader>Vasa korpa</DrawerHeader>

          <DrawerBody position='relative'>
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
          <DrawerFooter display='block' borderTop='1px solid' borderColor='neutral.50'>
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
