import {
  GridItem,
  Grid,
  Text,
  Box,
  FormControl,
  Heading,
  Input,
  FormLabel,
  Flex,
} from '@chakra-ui/react';

function Settings() {
  return (
    <FormControl>
      <Heading>Settings</Heading>
      <Grid
        mt={4}
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={4}
      >
        <GridItem
          w='100%'
          bg='neutral.10'
          p='4'
          borderRadius='md'
          boxShadow='base'
        >
          <FormLabel>Ime trgovine</FormLabel>
          <Input type='text' />
          <FormLabel mt='4'>Slika</FormLabel>
          <Input placeholder='Slika' type='file' />
          <Text fontSize='2xl' mt='8'>
            Radno vrijeme
          </Text>
          <FormLabel mt='4'>Ponedjeljak</FormLabel>
          <Flex gap={4}>
            <Input placeholder='Opis' type='time' />
            <Input placeholder='Opis' type='time' />
          </Flex>
          <FormLabel mt='4'>Utorak</FormLabel>
          <Flex gap={4}>
            <Input placeholder='Opis' type='time' />
            <Input placeholder='Opis' type='time' />
          </Flex>
          <FormLabel mt='4'>Srijeda</FormLabel>
          <Flex gap={4}>
            <Input placeholder='Opis' type='time' />
            <Input placeholder='Opis' type='time' />
          </Flex>
          <FormLabel mt='4'>Četvrtak</FormLabel>
          <Flex gap={4}>
            <Input placeholder='Opis' type='time' />
            <Input placeholder='Opis' type='time' />
          </Flex>
          <FormLabel mt='4'>Petak</FormLabel>
          <Flex gap={4}>
            <Input placeholder='Opis' type='time' />
            <Input placeholder='Opis' type='time' />
          </Flex>
          <FormLabel mt='4'>Subota</FormLabel>
          <Flex gap={4}>
            <Input placeholder='Opis' type='time' />
            <Input placeholder='Opis' type='time' />
          </Flex>
          <FormLabel mt='4'>Nedjelja</FormLabel>
          <Flex gap={4}>
            <Input placeholder='Opis' type='time' />
            <Input placeholder='Opis' type='time' />
          </Flex>
        </GridItem>
        <GridItem
          w='100%'
          bg='neutral.10'
          p='4'
          borderRadius='md'
          boxShadow='base'
        >
          <FormLabel>Naknada za dostavu</FormLabel>
          <Input type='number' />
          <FormLabel mt='4'>Minimalna narudžba</FormLabel>
          <Input type='number' />
          <FormLabel mt='4'>Neradni dan</FormLabel>
          <Input type='date' />
          <FormLabel mt='4'>Besplatna dostava preko:</FormLabel>
          <Input type='number' />
          <FormLabel mt='4'>
            Ne primamo narudzbe zadnjih koliko minuta
          </FormLabel>
          <Input type='number' />
        </GridItem>
      </Grid>
    </FormControl>
  );
}

export default Settings;
