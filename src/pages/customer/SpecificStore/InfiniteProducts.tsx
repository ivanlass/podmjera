import React from 'react';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import { SimpleGrid, Text } from '@chakra-ui/react';
import { useInfiniteQuery, QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { storeInterface } from '../../../interfaces/store.interface';
import ProductCard from '../../../components/ProductCard';

function InfiniteProducts() {
  const queryClient = useQueryClient();
  const { ref, inView } = useInView();
  const specificStore = queryClient.getQueryData<storeInterface>(['specificStore']);
  const { status, data, error, isFetching, isFetchingNextPage, isFetchingPreviousPage, fetchNextPage, fetchPreviousPage, hasNextPage, hasPreviousPage } = useInfiniteQuery(
    ['projects'],
    async ({ pageParam = 0 }) => {
      const res = await axios.get(`/api/article/pagination/page=${pageParam}/store=${specificStore?._id}`);
      return res.data;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    }
  );

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      <h1>Infinite Loading</h1>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error</span>
      ) : (
        <>
          <div>
            <button onClick={() => fetchPreviousPage()} disabled={!hasPreviousPage || isFetchingPreviousPage}>
              {isFetchingPreviousPage ? 'Loading more...' : hasPreviousPage ? 'Load Older' : 'Nothing more to load'}
            </button>
          </div>
          {data.pages.map((page: any) => (
            <React.Fragment key={page.nextId}>
              <SimpleGrid mt={2} px='4' columns={{ base: 2, md: 3, lg: 4, '2xl': 5 }} spacing={{ base: 2, md: 4 }}>
                {page.articles.map((project: any) => (
                  <ProductCard product={project} />
                ))}
              </SimpleGrid>
            </React.Fragment>
          ))}
          <div>
            <button ref={ref} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
              {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load Newer' : 'Nothing more to load'}
            </button>
          </div>
          <div>{isFetching && !isFetchingNextPage ? 'Background Updating...' : null}</div>
        </>
      )}
    </div>
  );
}

export default InfiniteProducts;
