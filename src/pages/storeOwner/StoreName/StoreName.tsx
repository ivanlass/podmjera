import { useRef } from 'react';
import { Button, Flex, Text, Input } from '@chakra-ui/react';
import { useSaveStoreName } from '../../../API/Queries';

const StoreName = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const {data, mutate: saveStoreName, isLoading } = useSaveStoreName();
  const sendName = () => {
    console.log('send name');
    // trim empty spaces from input value
    if(!inputRef.current?.value) return;

    const name = inputRef.current?.value.trim();
    saveStoreName(name);
  };
console.log(data)
  return (
    <Flex justifyContent='center' alignItems='center' flexDir='column' mt={24}>
      <Flex
        justifyContent='center'
        alignItems='center'
        flexDir='column'
        mt={24}
        bg='neutral.10'
        boxShadow='base'
        borderRadius='md'
        p='8'
      >
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
