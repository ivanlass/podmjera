import { Box, Heading, Icon, Image, Spinner, Text } from '@chakra-ui/react';
import { useGetStores } from '../API/Queries';
import { storeInterface } from '../interfaces/store.interface';
import { BiStore } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { ROUTE, createPath } from '../interfaces/routes.interface';
import { useQueryClient } from '@tanstack/react-query';

const StorePickerPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: stores, isLoading, isError } = useGetStores();

  if (isLoading)
    return (
      <Box w='100vw' h='100vh' display='flex' justifyContent='center' alignItems='center'>
        <Spinner size={'xl'} />
      </Box>
    );
  if (isError) return <Box>Error</Box>;

  const goToStore = (store: storeInterface) => {
    queryClient.setQueryData(['store'], store);
    navigate(
      createPath({
        path: ROUTE.STORE,
        params: { storeID: store._id, store: store.name },
      })
    );
  };
  return (
    <Box mt='20' px='4'>
      <Heading textAlign='center' mb='4'>
        Odaberite prodavnicu
      </Heading>
      {stores?.map((store: storeInterface) => (
        <Box key={store._id} onClick={() => goToStore(store)} p='4' cursor='pointer' w='min-content' textAlign='center' bg='neutral.10' boxShadow='xl' borderRadius='xl' _hover={{ boxShadow: '2xl' }}>
          <Image src={store.image} alt={store.name} fallback={<Icon as={BiStore} boxSize='6em' />} />
          <Text fontSize='3xl'>{store.name}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default StorePickerPage;
