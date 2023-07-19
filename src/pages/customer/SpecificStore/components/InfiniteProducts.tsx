import React from 'react';
import { SimpleGrid, Text } from '@chakra-ui/react';
import ProductCard from '../../../../components/ProductCard';
import { articlesInterface } from '../../../../interfaces/articles.interface';

interface Props {
  status: string;
  data: any;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => void;
  innerRef: any;
}

function InfiniteProducts({ status, data, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage, innerRef }: Props) {
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'error') {
    return <div>Error</div>;
  }
  return (
    <>
      {data.pages.map((page: any) => (
        <React.Fragment key={page.nextId}>
          <SimpleGrid mt={2} px='4' columns={{ base: 2, md: 3, lg: 4, '2xl': 5 }} spacing={{ base: 2, md: 4 }}>
            {page.articles.map((article: articlesInterface) => (
              <React.Fragment key={article._id}>
                <ProductCard product={article} />
              </React.Fragment>
            ))}
          </SimpleGrid>
        </React.Fragment>
      ))}
      <div>
        <Text textAlign='center' fontSize={{ base: 'md', md: '2xl' }} fontWeight='bold' my='8' ref={innerRef} onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? 'Učitavamo još artikala...' : hasNextPage ? 'Momenat...' : 'Nema više artikala'}
        </Text>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Background Updating...' : null}</div>
    </>
  );
}

export default InfiniteProducts;
