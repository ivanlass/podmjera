import React, { useEffect } from 'react';
import { Box, Grid, GridItem, Input, Text, Flex, Center, Textarea } from '@chakra-ui/react';
import ChooseLocation from './components/ChooseLocation';
import { useState } from 'react';
import ChoosePhoneNumber from './components/ChoosePhoneNumber';
import { useAuth0 } from '@auth0/auth0-react';
import { useGetUser } from '../../../API/Queries';
import ChooseTimeOfArrival from './components/ChooseTimeOfArrival';
import { TimeArrivalOptions } from '../../../interfaces/general.interface';

const BillingProcedure = () => {
  const { user } = useAuth0();
  const { data: userMeta } = useGetUser(user?.sub);
  const [selectedAddress, setSelectedAddress] = useState<string>('');
  const [selectedPhoneNumber, setSelectedphoneNumber] = useState<string>('');
  const [selectedTimeOfArrival, setSelectedTimeOfArrival] = useState<TimeArrivalOptions>(TimeArrivalOptions.Odmah);

  useEffect(() => {
    if (userMeta?.adresses) {
      setSelectedAddress(userMeta?.adresses[0] || '');
    }
    if (userMeta?.phoneNumbers) {
      setSelectedphoneNumber(userMeta?.phoneNumbers[0] || '');
    }
  }, [userMeta]);

  return (
    <Box mt={20}>
      <Flex alignItems='center' flexDir='column' w='100%' p={2}>
        <Box maxWidth={{ base: '100%', md: '50%' }}>
          <Box p={8} my={8} bg='neutral.10' borderRadius='xl' boxShadow='md'>
            <ChoosePhoneNumber selectedPhoneNumber={selectedPhoneNumber} setSelectedPhoneNumber={setSelectedphoneNumber} />
          </Box>
          <Box p={8} my={8} bg='neutral.10' borderRadius='xl' boxShadow='md'>
            <ChooseLocation selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} />
          </Box>
          <Box p={8} my={8} bg='neutral.10' borderRadius='xl' boxShadow='md'>
            <ChooseTimeOfArrival selectedTimeOfArrival={selectedTimeOfArrival} setSelectedTimeOfArrival={setSelectedTimeOfArrival} />
          </Box>
          <Box p={8} my={8} bg='neutral.10' borderRadius='xl' boxShadow='md'>
            <Text fontSize='2xl' fontWeight='bold'>
              Napomena
            </Text>
            <Text fontSize='sm' color='text.secondary'>
              Ukoliko imate napomenu za dostavljača, napišite je u polje ispod.
            </Text>
            <Text mb='4' fontSize='sm' color='text.secondary'>
              Na primjer "Crvena kuća sa drvenom ogradom".
            </Text>
            <Textarea placeholder='Napomena za dostavljača' maxLength={300} />
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default BillingProcedure;
