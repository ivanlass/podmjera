import React, { useState } from 'react';
import { Flex, Input, IconButton, useMediaQuery } from '@chakra-ui/react';
import { BsSearch } from 'react-icons/bs';

interface ProductFiltersProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
}

const ProductFilters = ({ setSearchQuery, searchQuery }: ProductFiltersProps) => {
  const [isLargerThan768] = useMediaQuery('(max-width: 768px)');
  const [isOpen, setIsOpen] = useState(!isLargerThan768 ? true : false);

  return (
    <>
      {isLargerThan768 && (
        <IconButton
          bg='transparent'
          boxShadow='none'
          aria-label='search'
          position='fixed'
          top='2'
          right={20}
          zIndex={101}
          icon={<BsSearch color='black' />}
          _active={{ boxShadow: 'none', bg: 'transparent' }}
          _focus={{ boxShadow: 'none', bg: 'transparent' }}
          onClick={() => setIsOpen(!isOpen)}
        />
      )}
      {isOpen && (
        <Flex
          position='fixed'
          top={{ base: '14', md: '6' }}
          zIndex={101}
          left='50%'
          transform='translate(-50%, 0)'
          flexDir='column'
          alignItems='center'
          bg='primary.500'
          borderBottomRadius='xl'
          p='4'
          boxShadow='md'
        >
          <Input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Pretraga' w='fit-content' bg='neutral.10' />
        </Flex>
      )}
    </>
  );
};

export default ProductFilters;
