import { Box, Heading, Spinner } from '@chakra-ui/react';
import { useGetStores } from '../../../API/Queries';
import { storeInterface } from '../../../interfaces/store.interface';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import StorePickerCard from './components/StorePickerCard';




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


  return (
    <Box mt='20' px='4'>
      <Heading textAlign='center' mb='4'>
        Odaberite prodavnicu
      </Heading>
      {stores?.map((store: storeInterface) => (
        <Box key={store._id}>
          <StorePickerCard store={store} />
        </Box>
      ))}
    </Box>
  );
};

export default StorePickerPage;
