import { Badge, Box, Icon, Image, Text } from '@chakra-ui/react';
import { storeInterface } from '../../../../interfaces/store.interface';
import { BiStore } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { ROUTE, createPath } from '../../../../interfaces/routes.interface';
import { useQueryClient } from '@tanstack/react-query';
import { currentDayInCroatian, currentDayKeyClose, currentDayKeyOpen, isOpen, isTodayDayOff } from '../../../../utils';

interface StoreCard {
  store: storeInterface;
}

const StorePickerCard = ({ store }: StoreCard) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const goToStore = (store: storeInterface) => {
    queryClient.setQueryData(['specificStore'], store);
    navigate(
      createPath({
        path: ROUTE.STORE,
        params: { storeID: store._id, store: store.name },
      })
    );
  };

  return (
    <Box key={store._id} onClick={() => goToStore(store)} p='4' cursor={'pointer'} w='max-content' textAlign='center' bg='neutral.10' boxShadow='md' borderRadius='xl' _hover={{ boxShadow: '2xl' }}>
      <Image src={store.image} alt={store.name} fallback={<Icon as={BiStore} boxSize='8em' />} />
      <Text fontSize='3xl'>{store.name}</Text>

      <Box display='flex' mt='4'>
        <Text fontSize='md' textAlign='left' color='text.secondary'>
          {currentDayInCroatian}
        </Text>
        <Text fontSize='md' fontWeight='bold' ml='2'>
          {store[currentDayKeyOpen]} - {store[currentDayKeyClose]}
        </Text>
      </Box>
      {isOpen(store[currentDayKeyOpen], store[currentDayKeyClose]) && !isTodayDayOff(store.nonWorkingDay) ? <Badge colorScheme='green'>Otvoreno</Badge> : <Badge colorScheme='red'>Zatvoreno</Badge>}
    </Box>
  );
};

export default StorePickerCard;
