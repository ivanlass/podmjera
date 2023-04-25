import { Box, FormLabel, Heading, Input, Text, Button, Flex, SimpleGrid, FormControl, FormErrorMessage } from '@chakra-ui/react';
import CategoryCard from './components/CategoryCard';
import { useSaveCategory, useGetStore, useGetUser, useGetCategories } from '../../../API/Queries';
import { useAuth0 } from '@auth0/auth0-react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

interface CategoryProps {
  category: string;
}

const Categories = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth0();
  const { data: userMeta } = useGetUser(user?.sub);
  const { data: store } = useGetStore(userMeta?._id);
  const { data: categories, refetch: refetchCategories } = useGetCategories(store?._id);
  const { mutate: saveCategory } = useSaveCategory({
    onSuccess: (newCategories: any) => {
      queryClient.setQueryData(['categories'], newCategories.category);
      reset();
    },
  });

  useEffect(() => {
    if (store?._id) {
      refetchCategories();
    }
  }, [store]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryProps>();

  const onSubmit = (data: CategoryProps) => {
    saveCategory({ ...data, storeID: store?._id });
  };

  return (
    <Box mt={12}>
      <Heading>Kategorije</Heading>
      <Box mt={4} w={{ base: '100%', lg: '40%' }} bg='neutral.10' p='4' borderRadius='md' boxShadow='base'>
        <Text fontSize='xl' fontWeight='bold'>
          Nova kategorija
        </Text>
        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
          <FormControl isInvalid={errors.hasOwnProperty('category')}>
            <FormLabel>Ime trgovine</FormLabel>
            <Input type='text' {...register('category', { required: true })} />
            <FormErrorMessage>Obavezno polje</FormErrorMessage>
          </FormControl>
          <Flex mt='4' justifyContent='flex-end'>
            <Button type='submit'>Spremi novu kategoriju</Button>
          </Flex>
        </form>
      </Box>
      <SimpleGrid mt='8' columns={{ base: 1, md: 4, xl: 6 }} spacing={4}>
        {categories.category.category?.map((category: any) => (
          <CategoryCard id={category} name={category} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Categories;
