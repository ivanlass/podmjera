import { Box, SimpleGrid } from '@chakra-ui/react';
import Basket from '../../../components/Basket';
import { BasketProvider } from '../../../store/Basket.Context';
import InfiniteProducts from './components/InfiniteProducts';
import ProductFilters from './components/ProductFilters';
import { useEffect, useState } from 'react';
import StoreHero from './components/StoreHero';
import SidebarFilter from './components/SidebarFilter';
import { Mode } from '../../../interfaces/general.interface';
import { useGetSearchedProducts } from '../../../API/Queries';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { articlesInterface } from '../../../interfaces/articles.interface';
import { useParams } from 'react-router-dom';
import React from 'react';
import ProductCard from '../../../components/ProductCard';

const SpecificStore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Sve');
  const [mode, setMode] = useState<Mode>(Mode.Default);
  const queryClient = useQueryClient();
  let { storeID } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { data: searchedArticles, refetch: searchArticles } = useGetSearchedProducts(searchQuery, storeID, { enabled: false });

  const handleSearchArticles = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value === '') {
      queryClient.invalidateQueries(['searchedArticles']);
      setMode(Mode.Default);
    }
    if (e.target.value.length > 2) {
      searchArticles();
      setMode(Mode.Search);
    }
  };

  return (
    <BasketProvider>
      <Box mt='56px'>
        <Basket />
        <SidebarFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}>
          <ProductFilters setMode={setMode} searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearchArticles={handleSearchArticles} />
          <StoreHero />
          {mode === Mode.Default && <InfiniteProducts />}
          {mode === Mode.Search && (
            <SimpleGrid mt={2} px='4' columns={{ base: 2, md: 3, lg: 4, '2xl': 5 }} spacing={{ base: 2, md: 4 }}>
              {searchedArticles &&
                searchedArticles.map((article: articlesInterface) => (
                  <React.Fragment key={article._id}>
                    <ProductCard product={article} />
                  </React.Fragment>
                ))}
            </SimpleGrid>
          )}
          {mode === Mode.Category && <p>ovde ide kategorije</p>}
        </SidebarFilter>
      </Box>
    </BasketProvider>
  );
};

export default SpecificStore;
