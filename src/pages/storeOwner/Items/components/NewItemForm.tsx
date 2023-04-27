import { useAuth0 } from '@auth0/auth0-react';
import { Box, Input, Text, Button, Flex, SimpleGrid, useToast, Spinner, FormControl, FormLabel, Switch, FormErrorMessage, Container } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useGetUser, useGetStore, useGetCategories } from '../../../../API/Queries';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';

const NewItemForm = () => {
  const { user } = useAuth0();
  const toast = useToast();
  const { data: userMeta } = useGetUser(user?.sub);
  const { data: store } = useGetStore(userMeta?._id);
  const { data: categories, refetch: refetchCategories, isLoading } = useGetCategories(store?._id);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (store?._id) {
      refetchCategories();
    }
  }, [store]);

  const onSubmit = (data: any) => {
    console.log('asdjkl');
    console.log(data);
  };

  return (
    <Box mt={4} w='100%' bg='neutral.10' p='4' borderRadius='md' boxShadow='base'>
      {isLoading ? (
        <Flex justifyContent='center' alignItems='center' minH='200px'>
          <Spinner size='xl' />
        </Flex>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
          <Text fontSize='xl' fontWeight='bold'>
            Novi artikal
          </Text>
          <SimpleGrid mt='4' columns={{ base: 1, md: 2 }} spacing={4}>
            <Input placeholder='Ime artikla' {...register('name', { required: true })} />
            <Controller
              control={control}
              name='food'
              rules={{ required: 'Please enter at least one food group.' }}
              render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
                <FormControl isInvalid={!!error} id='food'>
                  <Select
                    isMulti
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    options={categories?.category?.category.map((category: string) => ({
                      label: category,
                      value: category,
                    }))}
                    placeholder='Food Groups'
                    closeMenuOnSelect={false}
                  />

                  <FormErrorMessage>{error && error.message}</FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name='price'
              defaultValue=''
              rules={{ required: 'Molimo definirajte cijenu proizvoda.' }}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <FormControl isInvalid={!!error} id='price'>
                  <Input placeholder='cijena' name='price' type='number' onChange={onChange} onBlur={onBlur} value={value} />

                  <FormErrorMessage>{error && error.message}</FormErrorMessage>
                </FormControl>
              )}
            />
            <Controller
              control={control}
              name='image'
              defaultValue=''
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <FormControl isInvalid={!!error} id='image'>
                  <Input placeholder='Slika' name='image' type='file' onChange={onChange} onBlur={onBlur} value={value} />

                  <FormErrorMessage>{error && error.message}</FormErrorMessage>
                </FormControl>
              )}
            />

            <Controller
              control={control}
              name='available'
              defaultValue={true}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <FormControl isInvalid={!!error} id='available' display='flex' alignItems='center'>
                  <FormLabel htmlFor='available' mt='4'>
                    Imate na stanju?
                  </FormLabel>
                  <Switch mt='2' id='available' name='available' onChange={onChange} onBlur={onBlur} isChecked={value} />
                  <FormErrorMessage>{error && error.message}</FormErrorMessage>
                </FormControl>
              )}
            />
            <Flex mt='4' justifyContent='flex-end'>
              <Button type='submit'>Spremi novu kategoriju</Button>
            </Flex>
          </SimpleGrid>
        </form>
      )}
    </Box>
  );
};

export default NewItemForm;
