import { Button, useToast, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, ModalFooter } from '@chakra-ui/react';
import { articlesInterface } from '../../../../interfaces/articles.interface';
import { useDeleteArticle, useGetUser } from '../../../../API/Queries';
import { useAuth0 } from '@auth0/auth0-react';
import { useQueryClient } from '@tanstack/react-query';

interface EditItemProps {
  isOpen: boolean;
  onClose: () => void;
  article: articlesInterface;
  storeID: string;
}

const DeleteArticleModal = ({ isOpen, onClose, article, storeID }: EditItemProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { user } = useAuth0();
  const { data: userMeta } = useGetUser(user?.sub);
  const { mutate: deleteArticle } = useDeleteArticle({
    onSuccess: (updatedArticle: articlesInterface) => {
      console.log(updatedArticle);
      queryClient.invalidateQueries(['articles']);
      toast({
        description: 'Uspješno ste obrisali artikal.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
  });

  const handleDelete = () => {
    deleteArticle({ ...article, storeID, userID: userMeta?._id });
  };

  return (
    <Modal size='xl' isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Brisanje artikla</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Da li ste sigurni da želite obrisati {article.name}</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant='outline' mr='4'>
            Ne
          </Button>
          <Button onClick={handleDelete}>Da</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteArticleModal;
