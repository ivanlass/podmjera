import { useBreakpointValue, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Flex, Icon, Image, Text } from '@chakra-ui/react';
import { BiStore } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import { currentDayInCroatian, currentDayKeyClose, currentDayKeyOpen, englishToCroatian, isFutureDate, isOpen, isTodayDayOff, daysOrder } from '../../../../utils';
import { useGetSpecificStore } from '../../../../API/Queries';
import { format, isTomorrow } from 'date-fns';

const StoreHero = () => {
  let { storeID } = useParams();
  const { data: specificStore } = useGetSpecificStore(storeID, { enabled: !!storeID });
  const isMobile = useBreakpointValue({ base: true, md: false });
  const defaultIndex = isMobile ? [] : [0];

  const daysOrder = ['ponedjeljak', 'utorak', 'srijeda', 'četvrtak', 'petak', 'subota', 'nedjelja'];

  if (!specificStore) return null;
  return (
    <Accordion defaultIndex={defaultIndex} allowMultiple bg='neutral.10' boxShadow='md' borderRadius='xl' mx='4' mb='8' overflow='hidden'>
      <AccordionItem border='none' outline='none'>
        <Text color='text.primary'>
          <AccordionButton p='4'>
            <Box as='span' flex='1' textAlign='left'>
              Detalji o trgovini
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </Text>
        <AccordionPanel pb={0}>
          <Flex bg='neutral.10' justifyContent='space-between' flexDir={{ base: 'column', lg: 'row' }} columnGap='4' position='relative'>
            <Flex alignItems={{ base: 'center', lg: 'flex-start' }} flexDir='column'>
              <Text fontSize='3xl'>{specificStore.name}</Text>
              <Image src={specificStore.image} alt={specificStore.name} fallback={<Icon as={BiStore} boxSize='8em' />} />
            </Flex>

            <Box display='flex' flexDir='column' mt='4' my={{ base: 4, lg: 0 }}>
              {specificStore.freeDelivery && (
                <Box display='flex' justifyContent='space-between' columnGap='4' p='2' pt='0'>
                  <Text fontSize='md' color='text.primary'>
                    Besplatna dostava preko
                  </Text>
                  <Text fontSize='md' fontWeight='bold' color='text.primary'>
                    {specificStore.freeDelivery} KM
                  </Text>
                </Box>
              )}
              {specificStore.deliveryFee && (
                <Box display='flex' justifyContent='space-between' p='2'>
                  <Text fontSize='md' color='text.primary'>
                    Cijena dostave
                  </Text>
                  <Text fontSize='md' fontWeight='bold' color='text.primary'>
                    {specificStore.deliveryFee} KM
                  </Text>
                </Box>
              )}
              {specificStore.minimalOrder && (
                <Box display='flex' justifyContent='space-between' p='2'>
                  <Text fontSize='md' color='text.primary'>
                    Minimalna narudžba
                  </Text>
                  <Text fontSize='md' fontWeight='bold' color='text.primary'>
                    {specificStore.minimalOrder} KM
                  </Text>
                </Box>
              )}

              {specificStore.nonWorkingDay && isFutureDate(specificStore.nonWorkingDay) && (
                <Box display='flex' justifyContent='space-between' p='2'>
                  <Text fontSize='md' color='text.primary'>
                    Neradni dan
                  </Text>
                  <Text fontSize='md' fontWeight='bold' color='text.primary'>
                    {isTomorrow(new Date(specificStore.nonWorkingDay)) ? 'Sutra' : format(new Date(specificStore.nonWorkingDay), 'MMMM dd')}
                  </Text>
                </Box>
              )}
            </Box>
            <Box>
              {Object.keys(specificStore)
                .filter((key) => key.includes('Open'))
                .sort((a, b) => {
                  const dayA = englishToCroatian(a.replace('Open', '')).toLowerCase();
                  const dayB = englishToCroatian(b.replace('Open', '')).toLowerCase();
                  return daysOrder.indexOf(dayA) - daysOrder.indexOf(dayB);
                })
                .map((key) => (
                  <Box
                    key={key}
                    display='flex'
                    justifyContent='space-between'
                    p={englishToCroatian(key.replace('Open', '')) === currentDayInCroatian ? '2' : '0'}
                    px='2'
                    borderRadius='xl'
                    mb='4'
                    bg={englishToCroatian(key.replace('Open', '')) === currentDayInCroatian ? 'primary.500' : 'neutral.10'}
                  >
                    <Text fontSize='md' textAlign='left' color='text.primary'>
                      {englishToCroatian(key.replace('Open', ''))}
                    </Text>
                    <Text fontSize='md' fontWeight='bold' ml='2'>
                      {specificStore[key]} - {specificStore[key.replace('Open', 'Close')]}
                    </Text>
                  </Box>
                ))}
            </Box>
          </Flex>
          {!(isOpen(specificStore[currentDayKeyOpen], specificStore[currentDayKeyClose]) && !isTodayDayOff(specificStore.nonWorkingDay)) && (
            <Flex justifyContent='center' mb='4' w='100%'>
              <Text border='4px solid' borderColor='red.500' borderRadius='xl' color='red.500' px='4' fontSize='50px'>
                Zatvorena trgovina
              </Text>
            </Flex>
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default StoreHero;
