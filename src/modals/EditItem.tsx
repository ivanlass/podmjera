import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  useToast,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Switch,
  Text,
} from '@chakra-ui/react';
import { articlesInterface } from '../interfaces/articles.interface';
import { Controller, useForm } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import { useEditArticle, useGetUser } from '../API/Queries';
import { useAuth0 } from '@auth0/auth0-react';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import ChakraTagInput from '../components/ChakraTagInput';

interface EditItemProps {
  isOpen: boolean;
  onClose: () => void;
  article: articlesInterface;
  selectOptions: string[];
  storeID: string;
}

const EditItem = ({ isOpen, onClose, article, selectOptions, storeID }: EditItemProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth0();
  const { data: userMeta } = useGetUser(user?.sub);
  const [tags, setTags] = useState<string[]>([...article.tags]);
  const { mutate: sendArticle } = useEditArticle({
    onSuccess: (updatedArticle: articlesInterface) => {
      console.log(updatedArticle);
      queryClient.invalidateQueries(['articles']);
      toast({
        description: 'Uspješno ste uredili artikal.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
  });

  useEffect(() => {
    reset({
      name: article.name,
      price: article.price,
      category: article.category.map((category) => ({
        label: category,
        value: category,
      })),
      available: article.available,
      perPiece: article.perPiece,
      image: article.image,
      tags: article.tags,
    });
    setTags(article.tags);
  }, [article]);

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
      articleID: article._id,
      name: data.name,
      price: data.price,
      category,
      available: data.available,
      quantity: 0,
      storeID,
      perPiece: data.perPiece,
      tags,
    };
    sendArticle({ userID: userMeta._id, ...dataForSend, slika: data.image[0] });
  };

  const handleTagsChange = useCallback((event: SyntheticEvent, tags: string[]) => {
    setTags(tags.length > 0 ? tags : []);
  }, []);

  return (
    <Modal size='xl' isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Uredi artikal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
            <Text fontSize='xl' fontWeight='bold'>
              Novi artikal
            </Text>
            <SimpleGrid mt='4' columns={{ base: 1, md: 2 }} spacing={4}>
              <Input placeholder='Ime artikla' defaultValue={article.name} {...register('name', { required: true })} />
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
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      defaultValue={article.category.map((category: string) => ({
                        label: category,
                        value: category,
                      }))}
                      options={selectOptions.map((category: string) => ({
                        label: category,
                        value: category,
                      }))}
                      placeholder='Kategorija'
                    />

                    <FormErrorMessage>{error && error.message}</FormErrorMessage>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name='price'
                defaultValue={article.price}
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
                defaultValue={article.available}
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
                defaultValue={article.perPiece}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <FormControl isInvalid={!!error} id='perPiece' display='flex' alignItems='center'>
                    <FormLabel htmlFor='perPiece' mt='4'>
                      Na kilu
                    </FormLabel>
                    <Switch mt='2' id='perPiece' name='perPiece' onChange={onChange} onBlur={onBlur} isChecked={article.perPiece} />
                    <FormLabel htmlFor='perPiece' mt='4' ml='2'>
                      Na komad
                    </FormLabel>
                    <FormErrorMessage>{error && error.message}</FormErrorMessage>
                  </FormControl>
                )}
              />
              <Controller
                control={control}
                name='tags'
                defaultValue={true}
                rules={{ required: 'Molimo definirajte cijenu proizvoda.' }}
                render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                  <FormControl isInvalid={!!error} id='dags' display='flex' alignItems='center'>
                    <ChakraTagInput tags={tags} onTagsChange={handleTagsChange} wrapProps={{ direction: 'row', align: 'stretch' }} />
                    <FormErrorMessage>{error && error.message}</FormErrorMessage>
                  </FormControl>
                )}
              />
            </SimpleGrid>
            <ModalFooter mt='4' pr='0'>
              <Button variant='ghost' onClick={onClose}>
                Odbaci
              </Button>
              <Button type='submit'>Spremi novu kategoriju</Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditItem;
