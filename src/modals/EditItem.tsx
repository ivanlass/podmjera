import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
} from '@chakra-ui/react';

interface EditItemProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditItem = ({ isOpen, onClose }: EditItemProps) => {
  return (
    <Modal size='xl' isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Uredi artikal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid mt='4' columns={{ base: 1, md: 2 }} spacing={4}>
            <Box>
              <Input placeholder='Ime artikla' />
            </Box>
            <Box>
              <Input placeholder='Kategorija' />
            </Box>
            <Box>
              <Input placeholder='cijena' />
            </Box>
            <Box>
              <Input placeholder='Slika' />
            </Box>
            <Box>
              <Input placeholder='Dostupno' />
            </Box>
          </SimpleGrid>
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' onClick={onClose}>
            Odbaci
          </Button>
          <Button>Spremi</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditItem;
