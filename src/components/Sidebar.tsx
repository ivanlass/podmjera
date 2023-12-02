import React, { useEffect } from 'react';
import { IconButton, Box, CloseButton, Flex, Icon, useColorModeValue, Drawer, DrawerContent, useDisclosure, BoxProps, FlexProps } from '@chakra-ui/react';
import { FiSettings, FiMenu, FiList } from 'react-icons/fi';
import { RxAvatar } from 'react-icons/rx';
import { BiCategory } from 'react-icons/bi';
import { TbBread } from 'react-icons/tb';
import { IconType } from 'react-icons';
import { AiOutlineDashboard } from 'react-icons/ai';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { createPath, ROUTE } from '../interfaces/routes.interface';
import { useGetStore, useGetUser } from '../API/Queries';
import { useAuth0 } from '@auth0/auth0-react';

interface LinkItemProps {
  name: string;
  icon: IconType;
  to: string;
}

export default function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer autoFocus={false} isOpen={isOpen} placement='left' onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size='full'>
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} mt={12} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p='4'>
        <Outlet />
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { user } = useAuth0();
  const { data: userMeta } = useGetUser(user?.sub);
  const { data: store, refetch } = useGetStore(userMeta?._id, {
    enabled: false,
  });

  useEffect(() => {
    if (userMeta) {
      refetch();
    }
  }, [userMeta]);

  const linkItems: Array<LinkItemProps> = [
    {
      name: 'Dashboard',
      icon: AiOutlineDashboard,
      to: createPath({
        path: ROUTE.DASHBOARD,
        params: { store: store?.name || '' },
      }),
    },
    {
      name: 'Kategorije',
      icon: BiCategory,
      to: createPath({
        path: ROUTE.CATEGORIES,
        params: { store: store?.name || '' },
      }),
    },
    {
      name: 'Artikli',
      icon: TbBread,
      to: createPath({
        path: ROUTE.ARTICLES,
        params: { store: store?.name || '' },
      }),
    },

    {
      name: 'Narudžbe',
      icon: FiList,
      to: createPath({
        path: ROUTE.ORDERS,
        params: { store: store?.name || '' },
      }),
    },
    {
      name: 'Postavke',
      icon: FiSettings,
      to: createPath({
        path: ROUTE.SETTINGS,
        params: { store: store?.name || '' },
      }),
    },
    {
      name: 'Radnici',
      icon: RxAvatar,
      to: createPath({
        path: ROUTE.WORKERS,
        params: { store: store?.name || '' },
      }),
    },
  ];
  console.log(user)
  return (
    <Box bg='neutral.10' w={{ base: 'full', md: 60 }} pos='fixed' h='full' mt={10} {...rest}>
      <Flex alignItems='center' mx='8' my='4' justifyContent='flex-end'>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>

      {
  user &&
    linkItems
      .filter(link => user['http://demozero.net/roles']?.includes('storeOwner') || link.name !== 'Radnici')
      .map(link => (
        <NavItem key={link.name} icon={link.icon} to={link.to}>
          {link.name}
        </NavItem>
      ))
}

    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: String;
  to: string;
}
const NavItem = ({ icon, children, to, ...rest }: NavItemProps) => {
  const { pathname } = useLocation();
  return (
    <Link to={to}>
      <Flex
        align='center'
        p='2'
        mx='4'
        my='2'
        borderRadius='lg'
        role='group'
        cursor='pointer'
        color='primary.700'
        background={pathname === to ? 'primary.500' : 'transparent'}
        _hover={{
          bg: 'primary.300',
        }}
        {...rest}
      >
        {icon && <Icon mr='4' fontSize='16' as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height='20'
      alignItems='center'
      borderBottomWidth='1px'
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent='flex-end'
      {...rest}
    >
      <IconButton variant='outline' onClick={onOpen} aria-label='open menu' icon={<FiMenu />} />
    </Flex>
  );
};
