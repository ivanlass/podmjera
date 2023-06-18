import { Flex, Input } from '@chakra-ui/react';
import { useGetSearchedProducts } from '../../../../API/Queries';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { Mode } from '../../../../interfaces/general.interface';

interface ProductFiltersProps {
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
  handleSearchArticles: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductFilters = ({ setMode, setSearchQuery, searchQuery, handleSearchArticles }: ProductFiltersProps) => {
  let { storeID } = useParams();
  const queryClient = useQueryClient();
  const { data, refetch: searchArticles } = useGetSearchedProducts(searchQuery, storeID, {
    enabled: false,
  });

  return (
    <Flex position='fixed' top={6} zIndex={101} left='50%' transform='translate(-50%, 0)' flexDir='column' alignItems='center' bg='primary.500' borderBottomRadius='xl' p='4' boxShadow='md'>
      <Input value={searchQuery} onChange={(e) => handleSearchArticles(e)} placeholder='Pretraga' w='fit-content' bg='neutral.10' />
    </Flex>
  );
};

export default ProductFilters;
