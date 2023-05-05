import { Table, TableContainer, Text, Tbody, Td, Image, Th, Thead, Tr, IconButton, useDisclosure, Icon, Button, Flex, Box, Badge } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { TbSoup } from 'react-icons/tb';
import EditItem from '../../../../modals/EditItem';
import FavouriteItem from './FavouriteItemBlueprint';
import { useGetStore, useGetUser } from '../../../../API/Queries';
import { articlesInterface } from '../../../../interfaces/articles.interface';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery, useIsFetching, useIsMutating } from '@tanstack/react-query';
import DeleteArticleModal from './DeleteArticleModal';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import FavouriteSection from '../components/FavouriteSection';
import SearchArticles from './SearchArticles';

const ItemTable = () => {
  const { isOpen: isOpenEditItem, onOpen: onOpenEditItem, onClose: onCloseEditItem } = useDisclosure();
  const { isOpen: isOpenDeleteItem, onOpen: onOpenDeleteItem, onClose: onCloseDeleteItem } = useDisclosure();
  const { user } = useAuth0();
  const { data: userMeta, refetch: refetchGetUser } = useGetUser(user?.sub);
  const { data: store, refetch: refetchStore } = useGetStore(userMeta?._id);
  const [page, setPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [articleForEdit, setArticleForEdit] = useState<articlesInterface | null>(null);
  const [articleForDelete, setArticleForDelete] = useState<articlesInterface | null>(null);
  const isFetchingFavourites = useIsFetching({ queryKey: ['favourites'] });
  const isMutatingFavourites = useIsMutating({ mutationKey: ['favourites'] });
  const {
    isLoading: isLoadingArticles,
    data: articles,
    isError,
    refetch: refetchArticles,
  } = useQuery(
    ['articles', page],
    () => {
      return axios.get(`/api/article/pagination/${page}`).then((res) => {
        setTotalNumberOfPages(Math.ceil(res.data.totalNumberOfArticles / res.data.limit));
        return res.data.articles;
      });
    },
    { staleTime: 1000 * 60 * 5, keepPreviousData: true }
  );

  useEffect(() => {
    if (user) {
      refetchGetUser();
    }
  }, [user]);

  useEffect(() => {
    if (userMeta) {
      refetchStore();
    }
  }, [userMeta]);

  useEffect(() => {
    if (store?._id) {
      refetchArticles();
    }
  }, [store]);

  const handleEdit = (article: articlesInterface) => {
    setArticleForEdit(article);
    onOpenEditItem();
  };

  const handleDelete = (articleID: articlesInterface) => {
    setArticleForDelete(articleID);
    onOpenDeleteItem();
  };

  if (isLoadingArticles) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <>
      {articles?.length > 0 ? (
        <>
          {isFetchingFavourites || isMutatingFavourites ? (
            <Text>Fetching...</Text>
          ) : (
            <>
              {store && <FavouriteSection storeID={store._id} />}
              {store && <SearchArticles storeID={store._id} />}
            </>
          )}
          <TableContainer bg='neutral.10' borderRadius='xl' boxShadow='md' overflowY='auto'>
            <Table variant='unstyled'>
              <Thead>
                <Tr>
                  <Th>Slika</Th>
                  <Th>Ime</Th>
                  <Th>Kategorija</Th>
                  <Th>Cijena</Th>
                  <Th>Dostupno</Th>
                  <Th>Na komad</Th>
                  <Th isNumeric>Opcije</Th>
                </Tr>
              </Thead>
              <Tbody>
                {articles.map((item: articlesInterface) => (
                  <FavouriteItem key={item._id} name={item.name} articleID={item._id} storeID={item.storeID}>
                    <Td>
                      <Image src={item.image} fallback={<Icon as={TbSoup} boxSize='2em' />} alt='mlijeko' borderRadius='xl' height='50px' objectFit='contain' bgPosition='center' />
                    </Td>
                    <Td>{item.name}</Td>
                    <Td whiteSpace='normal'>
                      {item.category.map((category) => {
                        return (
                          <Badge m='1' key={category}>
                            {category}
                          </Badge>
                        );
                      })}
                    </Td>
                    <Td>{item.price} KM</Td>
                    <Td>{item.available ? 'Da' : 'Ne'}</Td>
                    <Td>{item.perPiece ? 'Da' : 'Ne'}</Td>
                    <Td isNumeric>
                      <IconButton variant='ghost' aria-label='edit' fontSize='xl' onClick={() => handleEdit(item)} icon={<EditIcon />} />
                      <IconButton ms='4' fontSize='xl' variant='ghost' aria-label='delete' icon={<DeleteIcon onClick={() => handleDelete(item)} />} />
                    </Td>
                  </FavouriteItem>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {articleForEdit && <EditItem isOpen={isOpenEditItem} onClose={onCloseEditItem} article={articleForEdit} selectOptions={store.category} storeID={store._id} />}
          {articleForDelete && <DeleteArticleModal isOpen={isOpenDeleteItem} onClose={onCloseDeleteItem} article={articleForDelete} storeID={store._id} />}

          <Flex my='4' justifyContent='center'>
            <Box bg='neutral.10' p={4} borderRadius='xl' boxShadow='md' display='flex' columnGap={2}>
              <IconButton variant='outline' aria-label='Next page' onClick={() => setPage(page - 1)} disabled={page === 1} icon={<BsChevronLeft />} />
              {page > 1 && totalNumberOfPages != page && <Button variant='outline'>{page - 1}</Button>}
              <Button variant='primary'>{page}</Button>
              {totalNumberOfPages != page && <Button variant='outline'>{page + 1}</Button>}
              <IconButton variant='outline' aria-label='Previous page' onClick={() => setPage(page + 1)} disabled={totalNumberOfPages === page} icon={<BsChevronRight />} />
            </Box>
          </Flex>
        </>
      ) : (
        <Flex justifyContent='center' alignItems='center' height='100%' mt='20'>
          <Text fontSize='4xl'>Nemate artikala u prodavnici</Text>
        </Flex>
      )}
    </>
  );
};

export default ItemTable;
