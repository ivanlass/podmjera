import { useState, useRef } from 'react';
import { Box, IconButton, Input, Text, Flex, Button, useToast } from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { useGetUser, useSaveAddress } from '../../../../API/Queries';
import { useAuth0 } from '@auth0/auth0-react';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  selectedAddress: string;
  setSelectedAddress: (address: string) => void;
}

const ChooseLocation = ({ selectedAddress, setSelectedAddress }: Props) => {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { user } = useAuth0();
  const { data: userMeta } = useGetUser(user?.sub);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: saveAddress } = useSaveAddress({
    onSuccess: (data: any) => {
      console.log(data);
      setIsOpenForm(false);
      toast({
        title: 'Adresa spremljena',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      queryClient.setQueryData(['userMeta'], () => ({
        ...data,
      }));
    },
  });

  const saveNewAddress = () => {
    saveAddress({ address: inputRef.current?.value, userID: userMeta?._id });
    setIsOpenForm(false);
  };

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
          <Input ref={inputRef} placeholder='Unesite adresu' />
          <Button onClick={saveNewAddress} mt='4' width='100%'>
            Spremi
          </Button>
        </Box>
      ) : (
        <Flex gap='8' rowGap={8} flexWrap='wrap'>
          {userMeta &&
            userMeta.adresses &&
            userMeta?.adresses.map((address: string) => {
              return (
                <Box
                  width='calc(50% - 16px)'
                  key={address}
                  height='50px'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  flexDir='column'
                  p={2}
                  borderRadius='xl'
                  border={selectedAddress === address ? '2px solid' : '1px solid'}
                  borderColor={selectedAddress === address ? 'primary.500' : 'neutral.50'}
                  boxShadow={selectedAddress === address ? 'lg' : 'md'}
                  cursor='pointer'
                  _hover={{ borderColor: 'primary.400', bg: 'transparent' }}
                  bg='neutral.20'
                  onClick={() => setSelectedAddress(address)}
                >
                  <Text fontSize='xl'>{address}</Text>
                </Box>
              );
            })}
        </Flex>
        // <Flex gap='2'>
        //   <Box
        //     width='100%'
        //     height='100px'
        //     display='flex'
        //     justifyContent='center'
        //     alignItems='center'
        //     flexDir='column'
        //     p={2}
        //     borderRadius='xl'
        //     border='1px solid'
        //     borderColor='neutral.50'
        //     cursor='pointer'
        //     _hover={{ borderColor: 'primary.400', bg: 'transparent' }}
        //     bg='neutral.20'
        //   >
        //     <Text fontSize='xl'>Titova bb</Text>
        //     <Text color='grey' fontSize='sm' cursor='pointer'>
        //       Odzak
        //     </Text>
        //   </Box>
        //   <Box
        //     width='100%'
        //     height='100px'
        //     display='flex'
        //     justifyContent='center'
        //     alignItems='center'
        //     flexDir='column'
        //     p={2}
        //     borderRadius='xl'
        //     border='1px solid'
        //     borderColor='primary.400'
        //     cursor='pointer'
        //     _hover={{ borderColor: 'primary.400', bg: 'transparent' }}
        //   >
        //     <Text fontWeight='bold' fontSize='xl'>
        //       Titova bb
        //     </Text>
        //     <Text color='grey' fontSize='sm' cursor='pointer'>
        //       Odzak
        //     </Text>
        //   </Box>
        // </Flex>
      )}
    </Box>
  );
};

export default ChooseLocation;
