import { Box, Flex, Grid, GridItem, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import BestList from './components/BestList';
import Statistics from './components/Statistics';
import { useGetUser, useStoreStatistics, useGetStore } from '../../../API/Queries';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '../../../interfaces/routes.interface';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { articlesInterface } from '../../../interfaces/articles.interface';
import FullPageSpinner from '../../../components/FullPageSpinner';


interface User {
  givenName: string;
  totalSpent: number;
}

interface Product {
  name: string;
  price: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const { data: userMeta, refetch } = useGetUser(user?.sub, {
    onSuccess: (data: any) => {
      if (!(data && data.storeID)) {
        return navigate(ROUTE.NAME);
      }
    },
  });
  const { data: store } = useGetStore(userMeta?._id);
  const { data: storeStatistics, isLoading } = useStoreStatistics(store?._id);

  useEffect(() => {
    if (userMeta) {
      refetch();
    }
    if (userMeta && !userMeta?.storeID) {
      navigate(ROUTE.NAME);
    }
  }, [userMeta]);

  if(isLoading) {
    return <FullPageSpinner />
  }

  // fake array of objects with name and price
  const bestProducts = storeStatistics.topArticles
  .map((article: articlesInterface) => ({
    name: article.name,
    price: article.count,
  }))
  .sort((a: Product, b: Product) => b.price - a.price);
  
  const bestCustomers = storeStatistics.topUsers.map((user: User) => ({
    name: user.givenName,
    price: user.totalSpent,
  }));


  return (
    <Box mt={12}>
      <Heading>Dashboard</Heading>
      {storeStatistics && 
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        gap={4}
      >
        <GridItem w='100%'>
          <Statistics label='Danas' number={storeStatistics.totalToday} helpText='Današnji prihod' />
        </GridItem>
        <GridItem w='100%'>
          <Statistics label='Jučer' number={storeStatistics.totalYesterday} helpText='Prihod od jučer' />
        </GridItem>
        <GridItem w='100%'>
          <Statistics label='Tjedan' number={storeStatistics.totalThisWeek} helpText='Prihod za ovaj tjedan' />
        </GridItem>
        <GridItem w='100%'>
          <Statistics label='Mjesec' number={storeStatistics.totalThisMonth} helpText='Prihod za ovaj mjesec' />
        </GridItem>
        <GridItem w='100%'>
          <Statistics label='Prošli mjesec' number={storeStatistics.totalLastMonth} helpText='Prihod za prošli mjesec' />
        </GridItem>
      </Grid>
      }
      
      <SimpleGrid columns={12} spacing={4} mt='4'>
        <GridItem colStart={1} colEnd={{ base: 13, lg: 10 }}>
          Ovde mozda neki graf
        </GridItem>
        <GridItem colStart={{ base: 1, lg: 10 }} colEnd={13}>
          <Box w='100%'>
            <Text fontSize='md' fontWeight='bold'>
              Najprodavaniji artikli
            </Text>
            <BestList list={bestProducts} sufix="x"/>
          </Box>
          <Box w='100%'>
            <Text fontSize='md' fontWeight='bold'>
              Najbolji kupci
            </Text>
            <BestList list={bestCustomers} sufix="KM"/>
          </Box>
        </GridItem>
      </SimpleGrid>
      <Flex gap={4} mt='4'></Flex>
    </Box>
  );
};

export default Dashboard;
