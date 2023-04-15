import { SimpleGrid, Text, Flex, Button, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

function StoreCard() {
  return (
    <SimpleGrid columns={[2, 1, 8]} spacing={4} bg='neutral.10' borderRadius='md' boxShadow='base' px='4' py='4' my='4' _hover={{ boxShadow: 'shadow.100' }}>
      <Flex flexDirection='column' justifyContent='center'>
        <Text>Bingo</Text>
      </Flex>
      <Flex flexDirection='column' textAlign='center'>
        <Text color='grey' fontSize='sm'>
          Danas
        </Text>
        <Text>123KM</Text>
      </Flex>
      <Flex flexDirection='column' textAlign='center'>
        <Text color='grey' fontSize='sm'>
          Jučer
        </Text>
        <Text>223KM</Text>
      </Flex>
      <Flex flexDirection='column' textAlign='center'>
        <Text color='grey' fontSize='sm'>
          Tjedan
        </Text>
        <Text>223KM</Text>
      </Flex>
      <Flex flexDirection='column' textAlign='center'>
        <Text color='grey' fontSize='sm'>
          Mjesec
        </Text>
        <Text>223KM</Text>
      </Flex>
      <Flex flexDirection='column' textAlign='center'>
        <Text color='grey' fontSize='sm'>
          Prosli mjesec
        </Text>
        <Text>223KM</Text>
      </Flex>
      <Flex alignItems='center' justifyContent='flex-end'>
        <Button size='sm' width='fit-content' variant='outline'>
          Disable
        </Button>
      </Flex>
      <Flex alignItems='center' justifyContent='flex-end'>
        <IconButton variant='ghost' width='fit-content' aria-label='Delete store' size='sm' icon={<DeleteIcon fontSize='xl' />} />
      </Flex>
    </SimpleGrid>
  );
}

export default StoreCard;
