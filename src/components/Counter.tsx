import { Box, Button, Flex, Text, IconButton } from '@chakra-ui/react';
import { SmallAddIcon, MinusIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState<number>(0);

  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  };

  return (
    <Box bg='primary.500' borderRadius='md'>
      {count > 0 ? (
        <Flex alignItems='center'>
          <IconButton
            aria-label='minus'
            size='sm'
            onClick={decrease}
            icon={<MinusIcon />}
          />

          <Text px='4' fontWeight='bold' color='primary.800'>
            {count}
          </Text>
          <IconButton
            size='sm'
            aria-label='plus'
            onClick={() => setCount(count + 1)}
            icon={<SmallAddIcon fontSize='2xl' />}
          />
        </Flex>
      ) : (
        <IconButton
          size='sm'
          aria-label='plus'
          onClick={() => setCount(count + 1)}
          icon={<SmallAddIcon fontSize='2xl' />}
        />
      )}
    </Box>
  );
};

export default Counter;
