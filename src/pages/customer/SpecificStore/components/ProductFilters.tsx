import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import { useGetSpecificStore } from '../../../../API/Queries';
import { useParams } from 'react-router-dom';

interface Props {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const ProductFilters = ({ selectedCategory, setSelectedCategory }: Props) => {
  let { storeID } = useParams();
  const { data: specificStore } = useGetSpecificStore(storeID, { enabled: !!storeID });

  return (
    <Flex flexDir='column' alignItems='center' bg='neutral.10' borderRadius='xl' p='4' boxShadow='md' mx='4' mb='8' mt='8'>
      <Input placeholder='Pretraga' w='fit-content' />
      <Text fontSize='sm' mt='4' color='text.secondary'>
        Kategorije
      </Text>
      <Box overflowX='auto' w='100%'>
        <Flex flexWrap='nowrap' mb='2' justifyContent='center'>
          <Button
            display='inline-block'
            variant={selectedCategory === 'Sve' ? 'solid' : 'outline'}
            borderRadius='full'
            boxShadow={selectedCategory === 'Sve' ? 'lg' : ''}
            whiteSpace='nowrap'
            minWidth='fit-content'
            overflow='hidden'
            textOverflow='ellipsis'
            onClick={() => setSelectedCategory('Sve')}
            mr='2'
            my='2'
          >
            Sve
          </Button>
          {specificStore &&
            specificStore.category.map((category: string) => (
              <Button
                display='inline-block'
                variant={selectedCategory === category ? 'solid' : 'outline'}
                borderRadius='full'
                boxShadow={selectedCategory === category ? 'lg' : ''}
                key={category}
                whiteSpace='nowrap'
                minWidth='fit-content'
                overflow='hidden'
                textOverflow='ellipsis'
                onClick={() => setSelectedCategory(category)}
                mx='2'
                my='2'
              >
                {category}
              </Button>
            ))}
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProductFilters;
