import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Image,
  Th,
  Thead,
  Tr,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const ItemTable = () => {
  return (
    <TableContainer bg='neutral.10' borderRadius='md' boxShadow='md' mt='4'>
      <Table variant='unstyled'>
        <Thead>
          <Tr>
            <Th>Slika</Th>
            <Th>Ime</Th>
            <Th>Kategorija</Th>
            <Th>Cijena</Th>
            <Th>Dostupno</Th>
            <Th isNumeric>Opcije</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr _hover={{ bg: 'neutral.20' }}>
            <Td>
              <Image
                src='https://www.konzumshop.ba/images/products/022/02230013_1l.gif'
                alt='mlijeko'
                borderRadius='md'
                height='80px'
                objectFit='contain'
                bgPosition='center'
              />
            </Td>
            <Td>Meggle Mlijeko 2.8%</Td>
            <Td>Mlijecni proizvodi</Td>
            <Td>25.4 KM</Td>
            <Td>Da</Td>
            <Td isNumeric>
              <IconButton
                variant='ghost'
                aria-label='edit'
                fontSize='xl'
                icon={<EditIcon />}
              />
              <IconButton
                ms='4'
                fontSize='xl'
                variant='ghost'
                aria-label='delete'
                icon={<DeleteIcon />}
              />
            </Td>
          </Tr>
          <Tr _hover={{ bg: 'neutral.20' }}>
            <Td>
              <Image
                src='https://www.konzumshop.ba/images/products/022/02230013_1l.gif'
                alt='mlijeko'
                borderRadius='md'
                height='80px'
                objectFit='contain'
                bgPosition='center'
              />
            </Td>
            <Td>Meggle Mlijeko 2.8%</Td>
            <Td>Mlijecni proizvodi</Td>
            <Td>25.4 KM</Td>
            <Td>Da</Td>
            <Td isNumeric>
              <IconButton
                variant='ghost'
                aria-label='edit'
                fontSize='xl'
                icon={<EditIcon />}
              />
              <IconButton
                ms='4'
                fontSize='xl'
                variant='ghost'
                aria-label='delete'
                icon={<DeleteIcon />}
              />
            </Td>
          </Tr>
          <Tr _hover={{ bg: 'neutral.20' }}>
            <Td>
              <Image
                src='https://www.konzumshop.ba/images/products/022/02230013_1l.gif'
                alt='mlijeko'
                borderRadius='md'
                height='80px'
                objectFit='contain'
                bgPosition='center'
              />
            </Td>
            <Td>Meggle Mlijeko 2.8%</Td>
            <Td>Mlijecni proizvodi</Td>
            <Td>25.4 KM</Td>
            <Td>Da</Td>
            <Td isNumeric>
              <IconButton
                variant='ghost'
                aria-label='edit'
                fontSize='xl'
                icon={<EditIcon />}
              />
              <IconButton
                ms='4'
                fontSize='xl'
                variant='ghost'
                aria-label='delete'
                icon={<DeleteIcon />}
              />
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ItemTable;
