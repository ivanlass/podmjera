import { DeleteIcon } from '@chakra-ui/icons';
import { Box, IconButton, Text, useToast } from '@chakra-ui/react';
import { useDeleteCategories } from '../../../../API/Queries';
import { useQueryClient } from '@tanstack/react-query';
import { storeInterface } from '../../../../interfaces/store.interface';

interface CategoryCardProps {
  id: string;
  name: string;
  storeID: string;
}
const CategoryCard = ({ id, name, storeID }: CategoryCardProps) => {
  const queryClient = useQueryClient();
  const toast = useToast();

  const { mutate: deleteCategory, isLoading: isDeletingCategory } = useDeleteCategories({
    onSuccess: (newCategories: storeInterface) => {
      queryClient.setQueryData(['store'], newCategories);
      toast({
        description: 'Uspješno ste obrisali kategoriju.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Došlo je do greške.',
        description: 'Pokušajte ponovno.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const deleteCategoryHandler = () => {
    deleteCategory({ storeID, category: name });
  };

  return (
    <Box key={id} display='flex' justifyContent='space-between' alignItems='center' bg='neutral.10' p='4' borderRadius='xl' boxShadow='md'>
      <Box>
        <Text textTransform='capitalize'>{name}</Text>
      </Box>
      <Box>
        <IconButton disabled={isDeletingCategory} variant='ghost' width='fit-content' aria-label='Delete store' size='sm' icon={<DeleteIcon onClick={deleteCategoryHandler} fontSize='xl' />} />
      </Box>
    </Box>
  );
};

export default CategoryCard;
