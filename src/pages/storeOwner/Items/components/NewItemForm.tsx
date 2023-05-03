import { useAuth0 } from '@auth0/auth0-react';
import { Box, Input, Text, Button, Flex, SimpleGrid, useToast, Spinner, FormControl, FormLabel, Switch, FormErrorMessage } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useGetUser, useGetStore, useAddArticle } from '../../../../API/Queries';
import { useForm, Controller } from 'react-hook-form';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const NewItemForm = () => {
  const { user } = useAuth0();
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data: userMeta, refetch: refetchUser } = useGetUser(user?.sub);
  const { data: store, isLoading, refetch: refetchStore } = useGetStore(userMeta?._id);
  const { mutate: sendArticle } = useAddArticle({
    onSuccess: (data: any) => {
      console.log(data);
      queryClient.setQueryData(['articles', 1], (old: any) => [...old, data]);
      toast({
        title: 'Artikal uspješno dodan.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      reset({
        name: '',
        price: '',
        category: [],
        available: true,
        perPiece: true,
        image: '',
      });
    },
    onError: (error: any) => {
      toast({
        title: error.response.data.message === 'Input buffer contains unsupported image format' ? 'Slika mora biti u formatu .jpg ili .png' : 'Greška prilikom dodavanja artikla.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  useEffect(() => {
    if (user) {
      refetchUser();
    }
    reset();
  }, [user]);

  useEffect(() => {
    if (userMeta) {
      refetchStore();
    }
  }, [userMeta]);

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
    const dataForSend = {
      name: data.name,
      price: data.price,
      category,
      available: data.available,
      quantity: 0,
      storeID: store._id,
      perPiece: data.perPiece,
    };

    sendArticle({ id: userMeta._id, ...dataForSend, slika: data.image[0] });
  };

  if (!store?.category)
    return (
      <Flex w='60%' bg='neutral.10' p='4' borderRadius='xl' boxShadow='base' justifyContent='center' alignItems='center' minH='200px'>
        <Spinner size='xl' />
      </Flex>
    );
  return (
    <Box mt={4} w='60%' bg='neutral.10' p='4' borderRadius='xl' boxShadow='base'>
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
                    isMulti={true}
                    name={name}
                    ref={ref}
                    onChange={onChange}
                    onBlur={onBlur}
                    defaultValue={[]}
                    value={value}
                    options={
                      store &&
                      store?.category.map((category: string) => ({
                        label: category,
                        value: category,
                      }))
                    }
                    placeholder='Kategorija'
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
            <Input placeholder='Slika' accept='.jpg, .jpeg, .png' type='file' {...register('image')} />
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
            <Controller
              control={control}
              name='perPiece'
              defaultValue={true}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <FormControl isInvalid={!!error} id='perPiece' display='flex' alignItems='center'>
                  <FormLabel htmlFor='perPiece' mt='4'>
                    Na kilu
                  </FormLabel>
                  <Switch mt='2' id='perPiece' name='perPiece' onChange={onChange} onBlur={onBlur} isChecked={value} />
                  <FormLabel htmlFor='perPiece' mt='4' ml='2'>
                    Na komad
                  </FormLabel>
                  <FormErrorMessage>{error && error.message}</FormErrorMessage>
                </FormControl>
              )}
            />
          </SimpleGrid>
          <Flex mt='4' justifyContent='flex-end'>
            <Button type='submit'>Spremi artikal</Button>
          </Flex>
        </form>
      )}
    </Box>
  );
};

export default NewItemForm;
