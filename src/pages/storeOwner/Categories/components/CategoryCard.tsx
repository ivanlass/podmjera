import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, Text } from '@chakra-ui/react';

interface CategoryCardProps {
  id: string;
  name: string;
}

const CategoryCard = ({id, name}: CategoryCardProps) => {
  return (
    <Box key={id} display='flex' justifyContent='space-between' alignItems='center' bg='neutral.10' p='4' borderRadius='md' boxShadow='base'>
      <Box>
        <Text textTransform='capitalize'>{name}</Text>
      </Box>
      <Box>
        <IconButton variant='ghost' width='fit-content' aria-label='Delete store' size='sm' icon={<DeleteIcon fontSize='xl' />} />
      </Box>
    </Box>
  );
};

export default CategoryCard;
