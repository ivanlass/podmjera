import React, { useEffect } from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import Basket from '../../../components/Basket';
import { BasketProvider } from '../../../store/Basket.Context';
import InfiniteProducts from './components/InfiniteProducts';
import ProductFilters from './components/ProductFilters';
import { useState } from 'react';
import StoreHero from './components/StoreHero';
import SidebarFilter from './components/SidebarFilter';
import { Mode } from '../../../interfaces/general.interface';
import { useGetSearchedProducts, useGetSpecificStore, useGetAllFavouriteArticles } from '../../../API/Queries';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { articlesInterface } from '../../../interfaces/articles.interface';
import { useParams } from 'react-router-dom';
import ProductCard from '../../../components/ProductCard';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import 'keen-slider/keen-slider.min.css';
import FavouriteProducts from './components/FavouriteProducts';

const SpecificStore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Sve');
  const [mode, setMode] = useState<Mode>(Mode.Default);
  const queryClient = useQueryClient();
  let { storeID } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { ref, inView } = useInView();
  const { data: specificStore } = useGetSpecificStore(storeID);
  const { data: searchedArticles, refetch: searchArticles } = useGetSearchedProducts(searchQuery, storeID, { enabled: false });
  const { data: favouriteArticles } = useGetAllFavouriteArticles(storeID);

  // handle search articles
  useEffect(() => {
    if (searchQuery === '') {
      queryClient.invalidateQueries(['searchedArticles']);
      setMode(Mode.Default);
    }

    if (searchQuery.length > 1) {
      searchArticles();
      if (mode !== Mode.Search) {
        setMode(Mode.Search);
      }
    }
  }, [searchQuery]);

  // Mode.Default: list all products from specific store (default mode) in infinite scroll
  const fetchArticles = async ({ pageParam = 0, category }: { pageParam: number; category: string }) => {
    const res = await axios.get(`/api/article/pagination/${pageParam}/store=${storeID}/category=${category}`);
    return res.data;
  };

  const { status, data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['infiniteProducts', storeID, selectedCategory], // Include selectedCategory as a dependency
    ({ pageParam }) => fetchArticles({ pageParam, category: selectedCategory }), // Pass the selectedCategory to fetchArticles
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      enabled: !!storeID,
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  useEffect(() => {
    // queryClient.invalidateQueries(['infiniteProducts', specificStore?._id, selectedCategory]);
    queryClient.removeQueries(['infiniteProducts', specificStore?._id, selectedCategory]);
    if (!inView && (mode === Mode.Default || mode === Mode.Category)) {
      fetchNextPage({ pageParam: 0 }); // Reset the page parameter to 1 when changing category
    }
  }, [mode]);

  return (
    <BasketProvider>
      <Box mt='56px'>
        <Basket />
        <SidebarFilter setMode={setMode} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}>
          <ProductFilters searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <StoreHero />

          {favouriteArticles && <FavouriteProducts articles={favouriteArticles} title='Istaknuto' />}

          {(mode === Mode.Default || mode === Mode.Category) && (
            <InfiniteProducts
              innerRef={ref}
              status={status}
              data={data}
              isFetching={isFetching}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
            />
          )}
          {mode === Mode.Search && (
            <SimpleGrid mt={2} px='4' columns={{ base: 2, md: 3, lg: 5, '2xl': 6 }} spacing={{ base: 2, md: 4 }}>
              {searchedArticles &&
                searchedArticles.map((article: articlesInterface) => (
                  <React.Fragment key={article._id}>
                    <ProductCard product={article} />
                  </React.Fragment>
                ))}
            </SimpleGrid>
          )}
        </SidebarFilter>
      </Box>
    </BasketProvider>
  );
};

export default SpecificStore;
