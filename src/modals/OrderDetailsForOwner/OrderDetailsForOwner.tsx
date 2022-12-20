import {
  Button,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
} from '@chakra-ui/react';
import Details from './components/Details';
import OrdersTable from './components/OrdersTable';

interface EditItemProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailsForOwner = ({ isOpen, onClose }: EditItemProps) => {
  return (
    <Modal size='full' isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Narudžba od Anto</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={12} spacing={4}>
            <GridItem colStart={1} colEnd={{ base: 13, lg: 9 }}>
              <OrdersTable />
            </GridItem>
            <GridItem colStart={{ base: 1, lg: 9 }} colEnd={13}>
              <Details />
            </GridItem>
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' onClick={onClose}>
            Zatvori
          </Button>
          <Button>Spremi</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderDetailsForOwner;
