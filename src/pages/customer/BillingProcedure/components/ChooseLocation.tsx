import { Box, IconButton, Input, Text, Flex, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

const ChooseLocation = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  return (
    <Box>
      <Flex justifyContent='space-between' alignItems='center' mt='8' mb='2'>
        <Text fontSize='2xl' fontWeight='bold'>
          Odaberite lokaciju
        </Text>
        <IconButton
          variant='outline'
          size='xs'
          borderRadius='full'
          icon={isOpenForm ? <AiOutlineClose /> : <AiOutlinePlus />}
          aria-label='new location'
          onClick={() => setIsOpenForm(!isOpenForm)}
        />
      </Flex>
      {isOpenForm ? (
        <Box>
          <Input placeholder='Unesite adresu' />
          <Text mt='8' mb='2' color='grey'>
            Možete označiti na mapi Vašu lokaciju, da bi Vas naš dostavljač
            lakše pronašao.
          </Text>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d22561.589632939897!2d18.327007624267583!3d45.02089164148128!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1shr!2sba!4v1677518270341!5m2!1shr!2sba'
            width='100%'
            height='450'
            loading='lazy'
          ></iframe>
          <Button mt='4' width='100%'>
            Spremi
          </Button>
        </Box>
      ) : (
        <Flex gap='2'>
          <Box
            width='100%'
            height='100px'
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDir='column'
            p={2}
            borderRadius='md'
            border='1px solid'
            borderColor='neutral.50'
            cursor='pointer'
            _hover={{ borderColor: 'primary.400', bg: 'transparent' }}
            bg='neutral.20'
          >
            <Text fontSize='xl'>Titova bb</Text>
            <Text color='grey' fontSize='sm' cursor='pointer'>
              Odzak
            </Text>
          </Box>
          <Box
            width='100%'
            height='100px'
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDir='column'
            p={2}
            borderRadius='md'
            border='1px solid'
            borderColor='primary.400'
            cursor='pointer'
            _hover={{ borderColor: 'primary.400', bg: 'transparent' }}
          >
            <Text fontWeight='bold' fontSize='xl'>
              Titova bb
            </Text>
            <Text color='grey' fontSize='sm' cursor='pointer'>
              Odzak
            </Text>
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default ChooseLocation;
