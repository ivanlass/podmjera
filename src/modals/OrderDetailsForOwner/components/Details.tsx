import { Box, Flex, Text } from '@chakra-ui/react';

const Details = () => {
  return (
    <Box p='4' bg='neutral.10' borderRadius='md' boxShadow='base'>
      <Text color='text.secondary' fontSize='sm'>
        Adresa
      </Text>
      <Text>Titova bb</Text>
      <Text mt='4' color='text.secondary' fontSize='sm'>
        Detalji
      </Text>
      <Text mb={4}>iza jeleckuse bijela kucavidit ces bijeli mercedes prid kucom. al de boga ti iza podne mi donesi jer necu bit kojce</Text>
      <iframe
        title='map'
        src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22555.533022127125!2d18.333696!3d45.036259300000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475c37d0e5fab681%3A0x13c480551cc0892b!2sPIMS%20Elektro%20Oprema%20d.o.o.!5e0!3m2!1shr!2sba!4v1671535744667!5m2!1shr!2sba'
        width='400'
        height='300'
        loading='lazy'
      ></iframe>
      <Flex justifyContent='space-between' mt={4}>
        <Text color='text.secondary' fontSize='sm'>
          Cijena
        </Text>
        <Text>132.45 KM</Text>
      </Flex>
      <Flex justifyContent='space-between'>
        <Text color='text.secondary' fontSize='sm'>
          Cijena dostave
        </Text>
        <Text>2.00 KM</Text>
      </Flex>
      <Flex justifyContent='space-between'>
        <Text color='text.secondary' fontSize='sm'>
          Ukupno
        </Text>
        <Text>134.45 KM</Text>
      </Flex>
    </Box>
  );
};

export default Details;
