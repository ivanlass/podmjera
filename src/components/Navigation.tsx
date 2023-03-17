import React, { useState, useRef, useEffect } from 'react';
import { Image, Flex, Button, Box } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import useOnClickOutside from '../hooks/useOnClickOutside';
import { FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import { BsShop } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { createPath, ROUTE } from '../interfaces/routes.interface';
// !TODO nadji kako auth0 da vrati id usera i onda ga upisati u bazu podataka
const Navigation = () => {
  const { user, loginWithPopup, logout, getAccessTokenSilently } = useAuth0();
  const [isDropdownOpen, setIsDropdownOpen] = useState<Boolean>(false);
  const ref = useRef(null);
  const navigate = useNavigate();

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
    if (
      user?.userType === 'new' &&
      localStorage.getItem('userType') !== 'registered'
    ) {
      signupUser();
    }
  }, [user]);

  const signupUser = async () => {
    console.log('asdljklasdjklasdjklasdjklasdjkl');
    const accessToken = await getAccessTokenSilently();
    axios
      .post('http://localhost:6060/api/user/signup', user, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log(res);
        // save in local storage info that user is registered
        localStorage.setItem('userType', 'registered');
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            ref={ref}
            cursor='pointer'
            onChange={(event) => console.log(event)}
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
