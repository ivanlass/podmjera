import { Badge, Box, Heading, Icon, Image, Spinner, Text } from '@chakra-ui/react';
import { useGetStores } from '../API/Queries';
import { storeInterface } from '../interfaces/store.interface';
import { BiStore } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { ROUTE, createPath } from '../interfaces/routes.interface';
import { useQueryClient } from '@tanstack/react-query';
import { parse, isWithinInterval, format } from 'date-fns';

// Get the current date
const currentDate = new Date();
// Get the day of the week as a number (0-6)
const dayOfWeek = currentDate.getDay();
// Define an array of day names
const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
// Get the key for the current day based on the day of the week
const currentDayKeyOpen = daysOfWeek[dayOfWeek] + 'Open';
const currentDayKeyClose = daysOfWeek[dayOfWeek] + 'Close';

enum WeekDays {
  monday,
  tuesday,
  wednesday,
  thursday,
  friday,
  saturday,
  sunday,
}

const currentDay = daysOfWeek[dayOfWeek] as keyof typeof WeekDays;
const currentDayInCroatian = getDayNameInCroatian(WeekDays[currentDay]);
function getDayNameInCroatian(day: WeekDays): string {
  switch (day) {
    case WeekDays.monday:
      return 'Ponedjeljak';
    case WeekDays.tuesday:
      return 'Utorak';
    case WeekDays.wednesday:
      return 'Srijeda';
    case WeekDays.thursday:
      return 'Četvrtak';
    case WeekDays.friday:
      return 'Petak';
    case WeekDays.saturday:
      return 'Subota';
    case WeekDays.sunday:
      return 'Nedjelja';
    default:
      return '';
  }
}

// Function to check if a specific day and time fall within opening hours
function isOpen(openingHours: any, closingHours: any) {
  const currentTime = new Date();
  const openingTime = parse(openingHours, 'HH:mm', new Date());
  const closingTime = parse(closingHours, 'HH:mm', new Date());
  // Check if the provided time falls within the opening hours
  return isWithinInterval(currentTime, { start: openingTime, end: closingTime });
}

const StorePickerPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: stores, isLoading, isError } = useGetStores();

  if (isLoading)
    return (
      <Box w='100vw' h='100vh' display='flex' justifyContent='center' alignItems='center'>
        <Spinner size={'xl'} />
      </Box>
    );
  if (isError) return <Box>Error</Box>;

  const goToStore = (store: storeInterface) => {
    queryClient.setQueryData(['specificStore'], store);
    navigate(
      createPath({
        path: ROUTE.STORE,
        params: { storeID: store._id, store: store.name },
      })
    );
  };
  return (
    <Box mt='20' px='4'>
      <Heading textAlign='center' mb='4'>
        Odaberite prodavnicu
      </Heading>
      {stores?.map((store: storeInterface) => (
        <Box
          key={store._id}
          onClick={() => isOpen(store[currentDayKeyOpen], store[currentDayKeyClose]) && goToStore(store)}
          p='4'
          cursor={isOpen(store[currentDayKeyOpen], store[currentDayKeyClose]) ? 'pointer' : 'not-allowed'}
          w='max-content'
          textAlign='center'
          bg='neutral.10'
          boxShadow='xl'
          borderRadius='xl'
          _hover={{ boxShadow: '2xl' }}
        >
          <Image src={store.image} alt={store.name} fallback={<Icon as={BiStore} boxSize='8em' />} />
          <Text fontSize='3xl'>{store.name}</Text>

          <Box display='flex' mt='4'>
            <Text fontSize='md' textAlign='left' color='text.secondary'>
              {currentDayInCroatian}
            </Text>
            <Text fontSize='md' fontWeight='bold' ml='2'>
              {store[currentDayKeyOpen]} - {store[currentDayKeyClose]}
            </Text>
          </Box>
          {isOpen(store[currentDayKeyOpen], store[currentDayKeyClose]) ? <Badge colorScheme='green'>Otvoreno</Badge> : <Badge colorScheme='red'>Zatvoreno</Badge>}
        </Box>
      ))}
    </Box>
  );
};

export default StorePickerPage;
