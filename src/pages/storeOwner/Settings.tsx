import { GridItem, Grid, Text, Box, Heading, Input, FormLabel, Flex, Button, FormErrorMessage, FormControl, useToast, Image } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useGetStore, useGetUser, useSaveStoreSettings } from '../../API/Queries';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface SettingsProps {
  name: string;
  image: string;
  mondayOpen: string;
  mondayClose: string;
  tuesdayOpen: string;
  tuesdayClose: string;
  wednesdayOpen: string;
  wednesdayClose: string;
  thursdayOpen: string;
  thursdayClose: string;
  fridayOpen: string;
  fridayClose: string;
  saturdayOpen: string;
  saturdayClose: string;
  sundayOpen: string;
  sundayClose: string;
  deliveryFee: number;
  minimalOrder: number;
  nonWorkingDay: Date;
  freeDelivery: number;
  noDeliveryLastMinutes: number;
}

function Settings() {
  const queryClient = useQueryClient();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SettingsProps>();
  const { user } = useAuth0();
  const { data: userMeta, refetch: refetchGetUser } = useGetUser(user?.sub);
  const { data: store } = useGetStore(userMeta?._id, {
    onSuccess: (storeSettings: any) => {
      reset({ ...storeSettings });
    },
  });
  const { mutate: sendSettings } = useSaveStoreSettings({
    onSuccess: (data: any) => {
      toast({
        description: 'Uspješno ste spremili postavke.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      queryClient.setQueryData(['store'], data);
    },
    onError: (error: any) => {
      toast({
        title: 'Došlo je do greške.',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: SettingsProps) => {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('file', data.image[0]);
    sendSettings({ id: userMeta._id, data, slika: data.image[0] });
  };

  useEffect(() => {
    if (user) {
      refetchGetUser();
    }
  }, [user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
      <Heading mt={12}>Postavke</Heading>
      <Grid mt={4} templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }} gap={4}>
        <GridItem w='100%' bg='neutral.10' p='4' borderRadius='xl' boxShadow='md'>
          <FormControl isInvalid={errors.hasOwnProperty('name')}>
            <FormLabel>Ime trgovine</FormLabel>
            <Input type='text' {...register('name', { required: true })} />
            <FormErrorMessage>Obavezno polje</FormErrorMessage>
          </FormControl>
          <Flex flexDirection='column' mt='4' alignItems='center'>
            <Image src={store?.image} w='300px' />
            <FormLabel mt='4'>Slika</FormLabel>
            <Input type='file' {...register('image')} w='300px' />
          </Flex>
          <Text fontSize='2xl' mt='8'>
            Radno vrijeme
          </Text>

          <Text textAlign='center' mt='4' fontSize='lg'>
            Ponedjeljak
          </Text>
          <Flex gap={4}>
            <FormControl isInvalid={errors.hasOwnProperty('mondayOpen')}>
              <FormLabel mt='4'>Otvoreno od:</FormLabel>
              <Input type='time' {...register('mondayOpen', { required: true })} />
              <FormErrorMessage>Obavezno polje</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.hasOwnProperty('mondayClose')}>
              <FormLabel mt='4'>Zatvoreno od:</FormLabel>
              <Input type='time' {...register('mondayClose', { required: true })} />
              <FormErrorMessage>Obavezno polje</FormErrorMessage>
            </FormControl>
          </Flex>
          <Text textAlign='center' mt='4' fontSize='lg'>
            Utorak
          </Text>
          <Flex gap={4}>
            <FormControl isInvalid={errors.hasOwnProperty('tuesdayOpen')}>
              <FormLabel mt='4'>Otvoreno od:</FormLabel>
              <Input type='time' {...register('tuesdayOpen', { required: true })} />
              <FormErrorMessage>Obavezno polje</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.hasOwnProperty('tuesdayClose')}>
              <FormLabel mt='4'>Zatvoreno od:</FormLabel>
              <Input type='time' {...register('tuesdayClose', { required: true })} />
              <FormErrorMessage>Obavezno polje</FormErrorMessage>
            </FormControl>
          </Flex>
          <Text textAlign='center' mt='4' fontSize='lg'>
            Srijeda
          </Text>
          <Flex gap={4}>
            <FormControl isInvalid={errors.hasOwnProperty('wednesdayOpen')}>
              <FormLabel mt='4'>Otvoreno od:</FormLabel>
              <Input type='time' {...register('wednesdayOpen', { required: true })} />
              <FormErrorMessage>Obavezno polje</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.hasOwnProperty('wednesdayClose')}>
              <FormLabel mt='4'>Zatvoreno od:</FormLabel>
              <Input type='time' {...register('wednesdayClose', { required: true })} />
              <FormErrorMessage>Obavezno polje</FormErrorMessage>
            </FormControl>
          </Flex>
          <Text textAlign='center' mt='4' fontSize='lg'>
            Četvrtak
          </Text>
          <Flex gap={4}>
            <FormControl isInvalid={errors.hasOwnProperty('thursdayOpen')}>
              <FormLabel mt='4'>Otvoreno od:</FormLabel>
              <Input type='time' {...register('thursdayOpen', { required: true })} />
              <FormErrorMessage>Obavezno polje</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.hasOwnProperty('thursdayClose')}>
              <FormLabel mt='4'>Zatvoreno od:</FormLabel>
              <Input type='time' {...register('thursdayClose', { required: true })} />
              <FormErrorMessage>Obavezno polje</FormErrorMessage>
            </FormControl>
          </Flex>
          <Text textAlign='center' mt='4' fontSize='lg'>
            Petak
          </Text>
          <Flex gap={4}>
            <FormControl isInvalid={errors.hasOwnProperty('fridayOpen')}>
              <FormLabel mt='4'>Otvoreno od:</FormLabel>
              <Input type='time' {...register('fridayOpen', { required: true })} />
              <FormErrorMessage>Obavezno polje</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.hasOwnProperty('fridayClose')}>
              <FormLabel mt='4'>Zatvoreno od:</FormLabel>
              <Input type='time' {...register('fridayClose', { required: true })} />
              <FormErrorMessage>Obavezno polje</FormErrorMessage>
            </FormControl>
          </Flex>
          <Text textAlign='center' mt='4' fontSize='lg'>
            Subota
          </Text>
          <Flex gap={4}>
            <FormControl isInvalid={errors.hasOwnProperty('saturdayOpen')}>
              <FormLabel mt='4'>Otvoreno od:</FormLabel>
              <Input type='time' {...register('saturdayOpen', { required: true })} />
              <FormErrorMessage>Obavezno polje</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.hasOwnProperty('saturdayClose')}>
              <FormLabel mt='4'>Zatvoreno od:</FormLabel>
              <Input type='time' {...register('saturdayClose', { required: true })} />
              <FormErrorMessage>Obavezno polje</FormErrorMessage>
            </FormControl>
          </Flex>
          <Text textAlign='center' mt='4' fontSize='lg'>
            Nedjelja
          </Text>
          <Flex gap={4}>
            <FormControl isInvalid={errors.hasOwnProperty('sundayOpen')}>
              <FormLabel mt='4'>Otvoreno od:</FormLabel>
              <Input type='time' {...register('sundayOpen', { required: true })} />
              <FormErrorMessage>Obavezno polje</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.hasOwnProperty('sundayClose')}>
              <FormLabel mt='4'>Zatvoreno od:</FormLabel>
              <Input type='time' {...register('sundayClose', { required: true })} />
              <FormErrorMessage>Obavezno polje</FormErrorMessage>
            </FormControl>
          </Flex>
        </GridItem>
        <GridItem w='100%' bg='neutral.10' p='4' borderRadius='xl' boxShadow='md'>
          <FormLabel>Naknada za dostavu</FormLabel>
          <Input type='number' {...register('deliveryFee')} />
          <FormLabel mt='4'>Minimalna narudžba</FormLabel>
          <Input type='number' {...register('minimalOrder')} />
          <FormLabel mt='4'>Neradni dan</FormLabel>
          <Input type='date' {...register('nonWorkingDay')} />
          <FormLabel mt='4'>Besplatna dostava preko:</FormLabel>
          <Input type='number' {...register('freeDelivery')} />
          <FormLabel mt='4'>Ne primamo narudzbe zadnjih koliko minuta</FormLabel>
          <Input type='number' {...register('noDeliveryLastMinutes')} />
          <Box w='100%' display='flex' justifyContent='flex-end' mt={4}>
            <Button type='submit'>Spremi</Button>
          </Box>
        </GridItem>
      </Grid>
    </form>
  );
}

export default Settings;
