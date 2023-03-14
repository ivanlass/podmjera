import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import Sidebar from '../../../components/Sidebar';
import BestList from './components/BestList';
import Statistics from './components/Statistics';

const Dashboard = () => {
  // fake array of objects with name and price
  const bestProducts = [
    { name: 'Product 1', price: 100 },
    { name: 'Product 2', price: 100 },
    { name: 'Product 3', price: 100 },
    { name: 'Product 4', price: 100 },
    { name: 'Product 5', price: 100 },
    { name: 'Product 6', price: 100 },
    { name: 'Product 7', price: 100 },
    { name: 'Product 8', price: 100 },
    { name: 'Product 9', price: 100 },
  ];

  const bestCustomers = [
    { name: 'Customer 1', price: 100 },
    { name: 'Customer 2', price: 100 },
    { name: 'Customer 3', price: 100 },
    { name: 'Customer 4', price: 100 },
    { name: 'Customer 5', price: 100 },
    { name: 'Customer 6', price: 100 },
    { name: 'Customer 7', price: 100 },
    { name: 'Customer 8', price: 100 },
    { name: 'Customer 9', price: 100 },
  ];

  return (
    <Box mt={12}>
      <Heading>Dashboard</Heading>
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
          <Statistics label='Danas' number={100} helpText='Današnji prihod' />
        </GridItem>
        <GridItem w='100%'>
          <Statistics label='Jučer' number={100} helpText='Prihod od jučer' />
        </GridItem>
        <GridItem w='100%'>
          <Statistics
            label='Tjedan'
            number={100}
            helpText='Prihod za ovaj tjedan'
          />
        </GridItem>
        <GridItem w='100%'>
          <Statistics
            label='Mjesec'
            number={100}
            helpText='Prihod za ovaj mjesec'
          />
        </GridItem>
        <GridItem w='100%'>
          <Statistics
            label='Prošli mjesec'
            number={100}
            helpText='Prihod za prošli mjesec'
          />
        </GridItem>
      </Grid>
      <SimpleGrid columns={12} spacing={4} mt='4'>
        <GridItem colStart={1} colEnd={{ base: 13, lg: 10 }}>
          Ovde mozda neki graf
        </GridItem>
        <GridItem colStart={{ base: 1, lg: 10 }} colEnd={13}>
          <Box w='100%'>
            <Text fontSize='md' fontWeight='bold'>
              Najprodavaniji artikli
            </Text>
            <BestList list={bestProducts} />
          </Box>
          <Box w='100%'>
            <Text fontSize='md' fontWeight='bold'>
              Najbolji kupci
            </Text>
            <BestList list={bestCustomers} />
          </Box>
        </GridItem>
      </SimpleGrid>
      <Flex gap={4} mt='4'></Flex>
    </Box>
  );
};

export default Dashboard;
