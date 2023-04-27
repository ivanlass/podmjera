import { useAuth0 } from '@auth0/auth0-react';
import { Box, Input, Text, Button, Flex, SimpleGrid, useToast, Spinner, FormControl, FormLabel, Switch, FormErrorMessage, Container } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useGetUser, useGetStore, useAddArticle } from '../../../../API/Queries';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';

const NewItemForm = () => {
  const { user } = useAuth0();
  const toast = useToast();
  const { data: userMeta } = useGetUser(user?.sub);
  const { data: store, isLoading } = useGetStore(userMeta?._id);
  const {mutate: sendArticle} = useAddArticle({
    onSuccess: (data: any) => {
      console.log(data);
  }, 
  onError: (error: any) => {
    console.log(error);
  }});

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  const onSubmit = (data: any) => {
    let formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', data.image[0]);
    const category = data.category.map((category: any) => category.label);
    console.log(data)
    const dataForSend = {
      name: data.name,
      price: data.price,
      category,
      available: data.available,
      quantity: 0,
      storeID: store._id
    };

    sendArticle({ id: userMeta._id, ...dataForSend, slika: data.image[0] });
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
              name='category'
              rules={{ required: 'Unesite barem jednu kategoriju.' }}
              render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { error } }) => (
                <FormControl isInvalid={!!error} id='category'>
                  <Select
                    isMulti
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    options={store?.category.map((category: string) => ({
                      label: category,
                    }))}
                    placeholder='Kategorija'
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
            {/* <Controller
              control={control}
              name='image'
              defaultValue=''
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <FormControl isInvalid={!!error} id='image'>
                  <Input placeholder='Slika' name='image' type='file' onChange={onChange} onBlur={onBlur} value={value} />

                  <FormErrorMessage>{error && error.message}</FormErrorMessage>
                </FormControl>
              )}
            /> */}
            

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
      <Input placeholder='Slika'  type='file' {...register("image")} />
    </Box>
  );
};

export default NewItemForm;
