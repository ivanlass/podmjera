import { Box, Heading, SimpleGrid, Spinner } from '@chakra-ui/react';
import { useGetStores } from '../../../API/Queries';
import { storeInterface } from '../../../interfaces/store.interface';
import StorePickerCard from './components/StorePickerCard';

const StorePickerPage = () => {
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
      <SimpleGrid column={4} minChildWidth='300px' spacing='40px'>
        {stores?.map((store: storeInterface) => (
          <Box key={store._id}>
            <StorePickerCard store={store} />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default StorePickerPage;
