import { useDisclosure, Button, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton,Text,  DrawerHeader, DrawerBody, Input, DrawerFooter, Box, Flex } from "@chakra-ui/react";
import React from "react";
import {BsBasket} from 'react-icons/bs';
import ProductCardSm from "./ProductCardSm";
function Basket() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        <Button pos='absolute' right='40px' top='40px' zIndex='docked' onClick={onOpen} size='null' p='4' borderRadius='full'>
         <BsBasket fontSize='lg'/> 
        </Button>
        <Drawer
        size={'md'}
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
        
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Vasa korpa</DrawerHeader>
  
            <DrawerBody position='relative'>
              <ProductCardSm />
              <ProductCardSm />
              <ProductCardSm />


            </DrawerBody>
  
            <DrawerFooter display='block' borderTop='1px solid' borderColor='neutral.50'>
            <Flex  justifyContent='space-between' mt='4' mb='4'>
                <Text>Total</Text>
                <Text fontWeight='bold'>233 KM</Text>
              </Flex>
              <Flex justifyContent='flex-end'>
              <Button variant='outline' mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='blue'>Save</Button>
              </Flex>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }


  export default Basket;