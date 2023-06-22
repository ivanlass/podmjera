import React, { ReactNode } from 'react';
import { IconButton, Box, CloseButton, Flex, useColorModeValue, Drawer, DrawerContent, Text, useDisclosure, BoxProps, FlexProps } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import { useGetSpecificStore } from '../../../../API/Queries';
import { useParams } from 'react-router-dom';
import { Mode } from '../../../../interfaces/general.interface';

interface Props {
  children: ReactNode;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setMode: (mode: Mode) => void;
}

export default function SimpleSidebar({ selectedCategory, setSelectedCategory, setMode, children }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH='100vh' bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        setMode={setMode}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer autoFocus={false} isOpen={isOpen} placement='left' onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size='full'>
        <DrawerContent>
          <SidebarContent setMode={setMode} onClose={onClose} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} pt={20}>
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setMode: (mode: Mode) => void;
}

const SidebarContent = ({ selectedCategory, setSelectedCategory, onClose, setMode, ...rest }: SidebarProps) => {
  let { storeID } = useParams();
  const { data: specificStore } = useGetSpecificStore(storeID, { enabled: !!storeID });
  return (
    <Box
      overflow='auto'
      bg={useColorModeValue('white', 'gray.900')}
      borderRight='1px'
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos='fixed'
      h='full'
      {...rest}
    >
      <Flex alignItems='center' p='4' justifyContent='flex-end'>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Text fontSize='lg' fontWeight='bold' p='2'>
        Kategorije
      </Text>
      <Text
        cursor='pointer'
        display='block'
        background={selectedCategory === 'Sve' ? 'primary.500' : 'neutral.10'}
        borderRadius='full'
        boxShadow={selectedCategory === 'Sve' ? 'lg' : ''}
        onClick={() => {
          setSelectedCategory('Sve');
          setMode(Mode.Default);
        }}
        m='2'
        px='4'
        py='2'
        mt={4}
        my={selectedCategory === 'Sve' ? '6' : '2'}
      >
        Sve
      </Text>
      {specificStore &&
        specificStore.category.map((category: string) => (
          <Text
            cursor='pointer'
            display='block'
            background={selectedCategory === category ? 'primary.500' : 'neutral.10'}
            borderRadius='full'
            boxShadow={selectedCategory === category ? 'lg' : ''}
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setMode(Mode.Category);
            }}
            m='2'
            my={selectedCategory === category ? '6' : '2'}
            px='4'
            py='2'
            textTransform='capitalize'
            transition={'all .3s ease'}
            color='neutral.500'
          >
            {category}
          </Text>
        ))}
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <IconButton
      display={{ base: 'flex', md: 'none' }}
      position='fixed'
      top='2'
      left='2'
      zIndex={100}
      variant='ghost'
      onClick={onOpen}
      aria-label='open menu'
      color='text.primary'
      icon={<FiMenu size='30px' />}
    />
  );
};
