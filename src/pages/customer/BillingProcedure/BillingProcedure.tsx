import { Box, Grid, GridItem, Input, Text, Flex } from '@chakra-ui/react';
import ChooseLocation from './components/ChooseLocation';

const BillingProcedure = () => {
  return (
    <Box>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={4}
        p={2}
        maxW='1800px'
        mx='auto'
      >
        <GridItem w='100%' p={2} bg='neutral.10' borderRadius='md'>
          <Text mt='4' mb='2' fontSize='2xl' fontWeight='bold'>
            Broj telefona
          </Text>
          <Input placeholder='Broj telefona' width='50%' />

          <ChooseLocation />

          <Text mt='8' mb='2' fontSize='2xl' fontWeight='bold'>
            Odaberite vrijeme dostave
          </Text>
          <Flex gap='2'>
            <Box
              width='100%'
              textAlign='center'
              display='flex'
              justifyContent='center'
              flexDir='column'
              alignItems='center'
              height='100px'
              p={2}
              borderRadius='md'
              border='1px solid'
              borderColor='primary.400'
              cursor='pointer'
              _hover={{ borderColor: 'primary.400', bg: 'transparent' }}
            >
              <Text fontWeight='bold' fontSize='xl'>
                Odmah
              </Text>
              <Text color='grey' fontSize='sm'>
                U roku od 90 minuta
              </Text>
            </Box>
            <Box
              width='100%'
              textAlign='center'
              display='flex'
              justifyContent='center'
              flexDir='column'
              alignItems='center'
              height='100px'
              p={2}
              borderRadius='md'
              border='1px solid'
              borderColor='neutral.50'
              cursor='pointer'
              _hover={{ borderColor: 'primary.400', bg: 'transparent' }}
              bg='neutral.20'
            >
              <Text fontSize='xl'>Poslije podne</Text>
              <Text color='grey' fontSize='sm'>
                14:00 - 16:00
              </Text>
            </Box>
            <Box
              width='100%'
              textAlign='center'
              display='flex'
              justifyContent='center'
              flexDir='column'
              alignItems='center'
              height='100px'
              p={2}
              borderRadius='md'
              border='1px solid'
              borderColor='neutral.50'
              cursor='pointer'
              _hover={{ borderColor: 'primary.400', bg: 'transparent' }}
              bg='neutral.20'
            >
              <Text fontSize='xl'>Predvečer</Text>
              <Text color='grey' fontSize='sm'>
                17:00 - 20:00
              </Text>
            </Box>
          </Flex>
        </GridItem>
        <GridItem w='100%' h='10' bg='blue.500' />
      </Grid>
    </Box>
  );
};

export default BillingProcedure;
