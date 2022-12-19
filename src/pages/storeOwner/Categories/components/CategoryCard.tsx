import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, Text } from '@chakra-ui/react';

const CategoryCard = () => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      bg='neutral.10'
      p='4'
      borderRadius='md'
      boxShadow='base'
    >
      <Box>
        <Text>Mlijecni proizvodi</Text>
        <Text fontSize='sm' fontWeight='bold' color='primary.700'>
          123
        </Text>
      </Box>
      <Box>
        <IconButton
          variant='ghost'
          width='fit-content'
          aria-label='Delete store'
          size='sm'
          icon={<DeleteIcon fontSize='xl' />}
        />
      </Box>
    </Box>
  );
};

export default CategoryCard;
