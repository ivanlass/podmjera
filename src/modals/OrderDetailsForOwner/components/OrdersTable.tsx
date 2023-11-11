import { Table, TableContainer, Tbody, Td, Image, Th, Thead, Tr, Checkbox, Icon } from '@chakra-ui/react';
import { ordersInterface } from '../../../interfaces/orders.interface';
import { articlesInterface } from '../../../interfaces/articles.interface';
import { CiApple } from 'react-icons/ci';

interface Props {
  order: ordersInterface;
}

const OrdersTable = ({ order }: Props) => {
  const testArr = Array.from(Array(10).keys());

  return (
    <TableContainer bg='neutral.10' borderRadius='xl' boxShadow='md' maxH='700px' overflowY='auto'>
      <Table variant='unstyled'>
        <Thead>
          <Tr>
            <Th>Slika</Th>
            <Th>Ime</Th>
            <Th>Količina</Th>
            <Th>Cijena</Th>
            <Th>Ukupno</Th>
            <Th>U korpi</Th>
          </Tr>
        </Thead>
        <Tbody>
          {order.articles.map((article: articlesInterface) => (
            <Tr key={article._id} _hover={{ bg: 'neutral.20' }}>
              <Td>
                <Image
                  src={article?.image}
                  alt='mlijeko'
                  borderRadius='xl'
                  height='80px'
                  objectFit='contain'
                  bgPosition='center'
                  fallback={<Icon as={CiApple} boxSize={{ base: '2rem', md: '3rem' }} color='primary.500' height='80px' alignSelf='center' />}
                />
              </Td>
              <Td>{article.name}</Td>
              <Td>
                {article.quantity} {article.perPiece ? 'kom' : 'kg'}
              </Td>
              <Td>{article.price} KM</Td>
              <Td>{article.price * article.quantity} KM</Td>
              <Td>
                <Checkbox />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
