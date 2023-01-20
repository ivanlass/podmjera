import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Box,
  Flex,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { BsBasket } from 'react-icons/bs';
import { BasketContext } from '../store/Basket.Context';
import ProductCardSm from './ProductCardSm';

function Basket() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const basketContext = useContext(BasketContext);

  return (
    <>
      <Button
        pos='absolute'
        right='40px'
        top='40px'
        zIndex='docked'
        onClick={onOpen}
        size='null'
        p='4'
        borderRadius='full'
      >
        {basketContext?.basket && basketContext?.basket.length > 0 && (
          <Text
            fontSize='xs'
            position='absolute'
            top='-15px'
            right='-15px'
            p='2'
            borderRadius='full'
            minW='32px'
            minH='32px'
            border='1px solid #fff'
            bg='primary.500'
          >
            {basketContext.basket.length}
          </Text>
        )}
        <BsBasket fontSize='lg' />
      </Button>
      <Drawer size={'md'} isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Vasa korpa</DrawerHeader>

          <DrawerBody position='relative'>
            {basketContext?.basket && basketContext?.basket.length > 0 ? (
              basketContext.basket.map((product) => (
                <Box key={product.id}>
                  <ProductCardSm key={product.id} product={product} />
                </Box>
              ))
            ) : (
              <Text textAlign='center' color='gray.500'>
                Korpa je prazna
              </Text>
            )}
          </DrawerBody>

          <DrawerFooter
            display='block'
            borderTop='1px solid'
            borderColor='neutral.50'
          >
            <Flex justifyContent='space-between' mt='4' mb='4'>
              <Text>Total</Text>
              <Text fontWeight='bold'>{basketContext?.totalPrice} KM</Text>
            </Flex>
            <Flex justifyContent='flex-end'>
              <Button variant='outline' mr={3} onClick={onClose}>
                Zatvori
              </Button>
              <Button colorScheme='blue'>Kupi</Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Basket;
