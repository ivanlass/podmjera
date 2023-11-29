import React, { useMemo } from 'react';
import { Box, Button, Center, IconButton, Input, InputGroup, InputRightAddon, Text, useToast } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCreateWorker, useGetStore, useGetUser, useGetWorkers } from '../../../API/Queries';
import { useForm } from 'react-hook-form';
import { UserInterface } from '../../../interfaces/user.interface';
import { DeleteIcon } from '@chakra-ui/icons';
import { useQueryClient } from '@tanstack/react-query';

const Workers = () => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth0();
  const { data: userMeta } = useGetUser(user?.sub, {});
  const { data: store } = useGetStore(userMeta?._id);
  const { data: storeWorkers } = useGetWorkers(store?._id);
  const { mutate: createWorker, isLoading } = useCreateWorker({
    onSuccess: () => {
      toast({
        title: 'Radnik uspješno kreiran.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      reset();
      queryClient.invalidateQueries(['workers']);
    },
    onError: () => {
      toast({
        title: 'Greška prilikom kreiranja radnika.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const sanitazeString = (string: string) => {
    return string.replace(/[^a-zA-Z0-9]/g, '');
  };

  const generateRandom4DigitNumber = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  // Wrap the memoization around the generation of values
  const { generatedNumber, sanitazedStoreName } = useMemo(() => {
    return {
      generatedNumber: generateRandom4DigitNumber(),
      sanitazedStoreName: sanitazeString(store?.name || ''),
    };
  }, [isLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();

  const onSubmit = async (data: any) => {
    createWorker({ username: `${data.username}${generatedNumber}`, storeName: sanitazeString(store.name), password: data.password, storeID: store?._id });
  };
  console.log(storeWorkers);
  return (
    <>
      <Center>
        <Box mt={{ base: 0, md: 20 }} borderRadius='md' bg='neutral.10' p='4' width='400px' maxW='400px'>
          <Text mb='4' fontSize='lg'>
            Unesi novog radnika
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputGroup size='sm' mb='4'>
              <Input
                placeholder='ime radnika/ce'
                {...register('username', {
                  required: 'Ime radnika/ce je obavezno.',
                  minLength: { value: 3, message: 'Minimalno 3 slova' },
                  maxLength: { value: 15, message: 'Maximalno 15 slova' },
                  pattern: {
                    value: /^[A-Za-z0-9]+$/, // matches any string of letters and numbers
                    message: 'Ime ne može sadržavati posebne znakove i razmake.',
                  },
                })}
                onChange={() => clearErrors('username')}
              />
              <InputRightAddon children={`${generatedNumber}@${sanitazedStoreName}`} />
            </InputGroup>
            {errors.username?.message && <Text maxW='400px' color='red.500' mb='8'>{`${errors.username?.message}`}</Text>}
            <Input
              mb='4'
              type='password'
              {...register('password', {
                required: true,
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Lozinka mora imati najmanje 8 znakova i sadržavati barem jedno veliko slovo, jedno malo slovo i jedan poseban znak.',
                },
              })}
              onChange={() => clearErrors('password')}
            />
            {errors.password?.message && <Text maxW='400px' color='red.500' mb='8'>{`${errors.password?.message}`}</Text>}
            <Box display='flex' justifyContent='flex-end'>
              <Button isLoading={isLoading} type='submit'>
                Spremi radnika
              </Button>
            </Box>
          </form>
        </Box>
      </Center>
      <Center>
        <Box mt={8} borderRadius='md' bg='neutral.10' p='4' width='100%'>
          <Text mb='4' fontSize='lg'>
            Radnici
          </Text>
          {storeWorkers?.map((worker: UserInterface) => {
            return (
              <Box key={worker._id} mb='4' display='flex' alignItems='center' justifyContent='space-between' width='100%'>
                <Box>
                  <Text fontSize='xl'>{worker.name}</Text>
                  <Text fontSize='sm' color='neutral.100'>
                    {worker.email}
                  </Text>
                </Box>
                <IconButton ms='4' fontSize='xl' variant='ghost' aria-label='delete' icon={<DeleteIcon />} />
              </Box>
            );
          })}
        </Box>
      </Center>
    </>
  );
};

export default Workers;
