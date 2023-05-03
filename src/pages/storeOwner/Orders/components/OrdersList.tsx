import { Table, TableContainer, Tbody, Td, Avatar, Th, Button, Thead, Tr, IconButton, useDisclosure, Flex } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import OrderDetailsForOwner from '../../../../modals/OrderDetailsForOwner/OrderDetailsForOwner';

const OrdersList = () => {
  const { isOpen: isOpenOrderDetails, onOpen: onOpenOrderDetails, onClose: onCloseOrderDetails } = useDisclosure();

  const testArr = Array.from(Array(10).keys());

  return (
    <TableContainer bg='neutral.10' borderRadius='xl' boxShadow='base' mt='4'>
      <Table variant='unstyled'>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Adresa</Th>
            <Th>Cijena</Th>
            <Th>Datum</Th>
            <Th>Status</Th>
            <Th>Opcije</Th>
          </Tr>
        </Thead>
        <Tbody>
          {testArr.map((item) => (
            <Tr key={item} _hover={{ bg: 'neutral.20' }}>
              <Td>
                <Flex alignItems='center'>
                  <Avatar me={4} src='https://img.freepik.com/premium-psd/3d-illustration-man-cartoon-close-up-portrait-standing-man-with-sunglasses-mustache-pink-background-3d-avatar-ui-ux_1020-5093.jpg?w=2000' />
                  Marko Markovic
                </Flex>
              </Td>
              <Td>Titova bb</Td>
              <Td>25.4 KM</Td>
              <Td>2022/12/13 13:45</Td>
              <Td>Pristiglo</Td>
              <Td>
                <Button variant='ghost' onClick={onOpenOrderDetails}>
                  Otvori
                </Button>
                <IconButton ms='4' fontSize='xl' variant='ghost' aria-label='delete' icon={<DeleteIcon />} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <OrderDetailsForOwner isOpen={isOpenOrderDetails} onClose={onCloseOrderDetails} />
    </TableContainer>
  );
};

export default OrdersList;
