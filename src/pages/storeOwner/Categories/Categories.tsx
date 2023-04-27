import { Box, Heading, Input, Text, Button, Flex, SimpleGrid, FormControl, FormErrorMessage, Spinner, useToast } from '@chakra-ui/react';
import CategoryCard from './components/CategoryCard';
import { useSaveCategory, useGetStore, useGetUser } from '../../../API/Queries';
import { useAuth0 } from '@auth0/auth0-react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { storeInterface } from '../../../interfaces/store.interface';

interface CategoryFormProps {
  category: string;
}

const Categories = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth0();
  const toast = useToast();
  const { data: userMeta } = useGetUser(user?.sub);
  const { data: store } = useGetStore(userMeta?._id);
  const { mutate: saveCategory, isLoading: isSavingCategory } = useSaveCategory({
    onSuccess: (newCategories: storeInterface) => {
      console.log(newCategories)
      queryClient.setQueryData(['store'], newCategories);
      reset();
      toast({
        description: 'Uspješno ste dodali kategoriju.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    },
  });


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormProps>();

  const onSubmit = (data: CategoryFormProps) => {
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
            <Input type='text' {...register('category', { required: true })} placeholder='Naziv kategorije (npr. Mliječni proizvodi)' />
            <FormErrorMessage>Obavezno polje</FormErrorMessage>
          </FormControl>
          <Flex mt='4'>
            <Button type='submit' w='100%' disabled={isSavingCategory}>
              {isSavingCategory ? <Spinner color='text.primary' /> : 'Spremi novu kategoriju'}
            </Button>
          </Flex>
        </form>
      </Box>
      <SimpleGrid mt='8' columns={{ base: 1, md: 4, xl: 6 }} spacing={4}>
        {store?.category?.map((category: any) => (
          <CategoryCard key={category} id={category} name={category} storeID={store?._id} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Categories;
