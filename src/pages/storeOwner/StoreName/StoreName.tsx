import { useRef } from 'react';
import { Button, Flex, Text, Input } from '@chakra-ui/react';
import { useSaveStoreName } from '../../../API/Queries';
import { ROUTE, createPath } from '../../../interfaces/routes.interface';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

const StoreName = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    data: store,
    mutate: saveStoreName,
    isLoading,
  } = useSaveStoreName({
    onSuccess: (store: any) => {
      if (store?.store?.name) {
        queryClient.setQueryData(['store'], store.store);
        navigate(
          createPath({
            path: ROUTE.DASHBOARD,
            params: { store: store?.store?.name },
          })
        );
      }
    },
  });

  const sendName = () => {
    if (!inputRef.current?.value) return;
    const name = inputRef.current?.value.trim();
    saveStoreName(name);
  };

  return (
    <Flex justifyContent='center' alignItems='center' flexDir='column' mt={24}>
      <Flex justifyContent='center' alignItems='center' flexDir='column' mt={24} bg='neutral.10' boxShadow='base' borderRadius='xl' p='8'>
        <Text mb='4'>Za početak unesite ime Vaše trgovine</Text>
        <Input placeholder='Ime trgovine' ref={inputRef} />
        <Button mt='4' w='100%' onClick={sendName}>
          {isLoading ? 'Učitavanje...' : 'Pošalji'}
        </Button>
      </Flex>
    </Flex>
  );
};

export default StoreName;
