import { Box, Text, Flex } from '@chakra-ui/react';
import { TimeArrivalOptions, TimeArrivalOptionsValues } from '../../../../interfaces/general.interface';
import { useGetSpecificStore } from '../../../../API/Queries';
import { useParams } from 'react-router-dom';
import { englishToCroatian, currentDayInCroatian, daysOrder } from '../../../../utils';

interface Props {
  selectedTimeOfArrival: TimeArrivalOptions;
  setSelectedTimeOfArrival: (timeOfArrival: TimeArrivalOptions) => void;
}

const ChooseTimeOfArrival = ({ selectedTimeOfArrival, setSelectedTimeOfArrival }: Props) => {
  let { storeID } = useParams();
  const { data: specificStore } = useGetSpecificStore(storeID, { enabled: !!storeID });

  return (
    <Box>
      <Text fontSize='2xl' fontWeight='bold'>
        Odaberite vrijeme dostave
      </Text>
      <Text mb='4' fontSize='sm' color='text.secondary'>
        Imajte na umu da dostava može biti kasnija od odabranog vremena dostave, ovisno o trenutnoj dostupnosti dostavljača.
      </Text>
      <Box>
        {specificStore &&
          Object.keys(specificStore)
            .filter((key) => key.includes('Open'))
            .sort((a, b) => {
              const dayA = englishToCroatian(a.replace('Open', '')).toLowerCase();
              const dayB = englishToCroatian(b.replace('Open', '')).toLowerCase();
              return daysOrder.indexOf(dayA) - daysOrder.indexOf(dayB);
            })
            .map(
              (key) =>
                englishToCroatian(key.replace('Open', '')) === currentDayInCroatian && (
                  <Box key={key} display='flex' mb='4'>
                    <Text fontSize='md' fontWeight='bold' textAlign='left' color='text.primary'>
                      Danas radimo od
                    </Text>
                    <Text fontSize='md' fontWeight='bold' ml='2'>
                      {specificStore[key]} - {specificStore[key.replace('Open', 'Close')]}
                    </Text>
                  </Box>
                )
            )}
      </Box>
      <Flex gap='2' flexDir={{ base: 'column', md: 'row' }}>
        {Object.keys(TimeArrivalOptions).map((key, index) => (
          <Box
            key={key}
            width='100%'
            textAlign='center'
            display='flex'
            justifyContent='center'
            flexDir='column'
            alignItems='center'
            height='100px'
            p={2}
            borderRadius='xl'
            cursor='pointer'
            border={selectedTimeOfArrival === TimeArrivalOptions[key as keyof typeof TimeArrivalOptions] ? '2px solid' : '1px solid'}
            borderColor={selectedTimeOfArrival === TimeArrivalOptions[key as keyof typeof TimeArrivalOptions] ? 'primary.500' : 'neutral.50'}
            boxShadow={selectedTimeOfArrival === TimeArrivalOptions[key as keyof typeof TimeArrivalOptions] ? 'lg' : 'md'}
            _hover={{ borderColor: 'primary.400', bg: 'transparent' }}
            onClick={() => setSelectedTimeOfArrival(TimeArrivalOptions[key as keyof typeof TimeArrivalOptions])}
          >
            <Text fontWeight='bold' fontSize='xl'>
              {TimeArrivalOptions[key as keyof typeof TimeArrivalOptions]}
            </Text>
            <Text color='grey' fontSize='sm'>
              {TimeArrivalOptionsValues[key as keyof typeof TimeArrivalOptionsValues]}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default ChooseTimeOfArrival;
