import { useRef } from 'react';
import { Button, Flex, Text, Input } from '@chakra-ui/react';
const StoreName = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const sendName = () => {
    console.log('send name');
    console.log(inputRef.current?.value);
  };
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
          Spremi
        </Button>
      </Flex>
    </Flex>
  );
};

export default StoreName;
