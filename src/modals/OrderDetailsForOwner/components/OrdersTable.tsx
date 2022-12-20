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
  Tfoot,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

const OrdersTable = () => {
  const testArr = Array.from(Array(10).keys());

  return (
    <TableContainer
      bg='neutral.10'
      borderRadius='md'
      boxShadow='base'
      height='700px'
      overflowY='auto'
    >
      <Table variant='unstyled'>
        <Thead>
          <Tr>
            <Th>Slika</Th>
            <Th>Ime</Th>
            <Th>Količina</Th>
            <Th>Cijena</Th>
            <Th>Ukupno</Th>
            <Th>Opcije</Th>
          </Tr>
        </Thead>
        <Tbody>
          {testArr.map((item) => (
            <Tr key={item} _hover={{ bg: 'neutral.20' }}>
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
              <Td>3</Td>
              <Td>2.00 KM</Td>
              <Td>6.00 KM</Td>
              <Td>
                <IconButton
                  ms='4'
                  fontSize='xl'
                  variant='ghost'
                  aria-label='delete'
                  icon={<DeleteIcon />}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th></Th>
            <Th>Ukupno</Th>
            <Th fontSize='md' fontWeight='bold'>
              145.50 KM
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
