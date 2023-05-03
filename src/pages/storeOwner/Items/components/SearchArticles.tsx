import { Button, Flex, IconButton, Input } from '@chakra-ui/react';
import { useSearchArticles } from '../../../../API/Queries';
import { useState } from 'react';
import { GrPowerCycle } from 'react-icons/gr';
import { useQueryClient } from '@tanstack/react-query';

interface SearchArticleProps {
  storeID: String;
}

const SearchArticles = ({ storeID }: SearchArticleProps) => {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { mutate: searchArticles } = useSearchArticles({
    onSuccess: (articles: any) => {
      queryClient.setQueryData(['articles', 1], articles.articles);
    },
  });

  const handleSearchArticles = () => {
    searchArticles({ storeID, searchQuery });
  };

  const handleReset = () => {
    setSearchQuery('');
    queryClient.invalidateQueries(['articles', 1]);
  };

  return (
    <Flex mt='20' mb='4' justifyContent='center'>
      <Flex w={{ base: '100%', md: '60%', xl: '40%', '2xl': '30%' }} bg='neutral.10' p='4' boxShadow='md' borderRadius='xl' columnGap='4'>
        <Input placeholder='Pretražite artikle...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <Button onClick={handleSearchArticles}>Potraži</Button>
        <IconButton variant='ghost' aria-label='Pretraži artikle' icon={<GrPowerCycle />} onClick={handleReset} />
      </Flex>
    </Flex>
  );
};

export default SearchArticles;
