import React, { useState, useRef, useEffect } from 'react';
import { Flex, Button, Box, Avatar } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsShop } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { createPath, ROUTE } from '../interfaces/routes.interface';
import { useCreateUser, useGetStore, useGetUser } from '../API/Queries';

const Navigation = () => {
  const { user, loginWithPopup, logout } = useAuth0();
  const { mutate } = useCreateUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
  const { data: userMeta, refetch: refetchGetUser } = useGetUser(user?.sub);
  const navigate = useNavigate();
  const ref = useRef(null);
  const { data: store, refetch } = useGetStore(userMeta?._id, {
    enabled: false,
  });

  useEffect(() => {
    if (userMeta) {
      refetch();
    }
  }, [userMeta]);

  const handleClickOutside = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
  };
  const login = async () => {
    loginWithPopup();
  };

  useEffect(() => {
    if (user?.userType === 'new') {
      mutate();
    }
    if (user) {
      refetchGetUser();
    }
  }, [user]);
  console.log(userMeta);
  useOnClickOutside(ref, handleClickOutside);
  return (
    <Flex as='nav' justifyContent='space-between' alignItems={'center'} px='4' py='2' bg='primary.500' w='100%' position='fixed' top='0' zIndex='docked' boxShadow='md'>
      <Box ml={{ base: 12, md: 0 }}>
        <Link to='/'>Podmjera.ba</Link>
      </Box>
      <Flex alignItems='center' gap='2'>
        {user ? (
          <Avatar onClick={() => setIsDropdownOpen((prev) => !prev)} h='40px' w='40px' src={user?.picture} cursor='pointer' />
        ) : (
          <Button onClick={login} variant='none'>
            Login
          </Button>
        )}
        {isDropdownOpen && (
          <Box ref={ref} position='absolute' top='50px' right={4} bg='neutral.10' boxShadow={'md'} zIndex='dropdown' p='4' w='150px' borderRadius='xl'>
            {user && (user['http://demozero.net/roles'].includes('storeOwner') || user['http://demozero.net/roles'].includes('worker')) && (
              <Button
                leftIcon={<BsShop />}
                onClick={() =>
                  navigate(
                    createPath({
                      path: ROUTE.DASHBOARD,
                      params: { store: store ? store.name : '' },
                    })
                  )
                }
                variant='ghost'
                p='0'
              >
                Trgovina
              </Button>
            )}

            {user && (
              <Button
                leftIcon={<AiOutlineUnorderedList />}
                onClick={() =>
                  navigate(
                    createPath({
                      path: ROUTE.ORDERSCUSTOMER,
                      params: { newOrder: 'false' },
                    })
                  )
                }
                variant='ghost'
                p='0'
              >
                Narudžbe
              </Button>
            )}

            <Button onClick={handleLogout} leftIcon={<FiLogOut />} variant='ghost' p='0'>
              Logout
            </Button>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Navigation;
function getAccessTokenSilently() {
  throw new Error('Function not implemented.');
}
