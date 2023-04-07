import React, { useState, useRef, useEffect } from 'react';
import { Image, Flex, Button, Box } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { FiLogOut } from 'react-icons/fi';
import { BsShop } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { createPath, ROUTE } from '../interfaces/routes.interface';
import { useCreateUser, useGetUser } from '../API/Queries';

const Navigation = () => {
  const { user, loginWithPopup, logout } = useAuth0();
  const { mutate } = useCreateUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
  const { refetch: refetchGetUser } = useGetUser(user?.sub);
  const navigate = useNavigate();
  const ref = useRef(null);

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

  useOnClickOutside(ref, handleClickOutside);
  return (
    <Flex
      as='nav'
      justifyContent='flex-end'
      px='4'
      py='2'
      bg='primary.500'
      w='100%'
      position='fixed'
      top='0'
      zIndex='docked'
      boxShadow='md'
    >
      <Flex alignItems='center' gap='2'>
        {user ? (
          <Image
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            borderRadius='full'
            h='40px'
            src={user?.picture}
            alt='user'
            cursor='pointer'
          />
        ) : (
          <Button onClick={login} variant='none'>
            Login
          </Button>
        )}
        {isDropdownOpen && (
          <Box
            ref={ref}
            position='absolute'
            top='50px'
            right={4}
            bg='neutral.10'
            boxShadow={'md'}
            zIndex='dropdown'
            p='4'
            w='150px'
            borderRadius='md'
          >
            {user &&
              user['http://demozero.net/roles'].includes('storeOwner') && (
                <Button
                  leftIcon={<BsShop />}
                  onClick={() =>
                    navigate(
                      createPath({
                        path: ROUTE.DASHBOARD,
                        params: { store: 'jeleckusa' },
                      })
                    )
                  }
                  variant='ghost'
                  p='0'
                >
                  Trgovina
                </Button>
              )}

            <Button
              onClick={handleLogout}
              leftIcon={<FiLogOut />}
              variant='ghost'
              p='0'
            >
              Logout
            </Button>
          </Box>
        )}
      </Flex>
    </Flex>
  );
};

export default Navigation;
