import React from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { SimpleGrid, Text } from '@chakra-ui/react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { storeInterface } from '../../../interfaces/store.interface';
import ProductCard from '../../../components/ProductCard';
import FullPageSpinner from '../../../components/FullPageSpinner';
import { articlesInterface } from '../../../interfaces/articles.interface';

function InfiniteProducts() {
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();
  const specificStore = queryClient.getQueryData<storeInterface>(['specificStore']);

  const fetchArticles = async ({ pageParam = 0 }) => {
    const res = await axios.get(`/api/article/pagination/${pageParam}/store=${specificStore?._id}`);
    return res.data;
  };

  const {
    status,
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(['infiniteProducts', specificStore?._id], fetchArticles, {
    getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined
  });



  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      {status === 'loading' ? (
        <FullPageSpinner text='Da vidimo što se sve nalazi u ovoj trgovini...'/>
      ) : status === 'error' ? (
        <Text>Error</Text>
      ) : (
        <>
          {data.pages.map((page: any) => (
            <React.Fragment key={page.nextId}>
              <SimpleGrid mt={2} px='4' columns={{ base: 2, md: 3, lg: 4, '2xl': 5 }} spacing={{ base: 2, md: 4 }}>
                {page.articles.map((article: articlesInterface) => (
                  <ProductCard product={article} />
                ))}
              </SimpleGrid>
            </React.Fragment>
          ))}
          <div>
            <Text textAlign='center' fontSize={{base:'md', md:'2xl'}} fontWeight='bold' my='8' ref={ref} onClick={() => fetchNextPage()}>
              {isFetchingNextPage ? 'Učitavamo još artikala...' : hasNextPage ? 'Momenat...' : 'Nema više artikala'}
            </Text>
          </div>
          <div>{isFetching && !isFetchingNextPage ? 'Background Updating...' : null}</div>
        </>
      )}
    </div>
  );
}

export default InfiniteProducts;
