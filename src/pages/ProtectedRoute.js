import { useAuth0 } from '@auth0/auth0-react';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth0();

  if (isLoading)
    return (
      <Box position='absolute' top={0} left={0} height='100vh' width='100vw' background='neutral.10'>
        <Box position='absolute' left='50%' top='50%' transform='translate(-50%, -50%)' display='flex' flexDirection='column' alignItems='center'>
          <Text fontSize='xl' fontWeight='bold' mb={4}>
            Učitava se...
          </Text>
          <Spinner size='xl' color='primary.500' />
        </Box>
      </Box>
    );

  if (user === undefined && !isLoading) {
    return <Navigate to='/' replace />;
  }
  if (user && !(user['http://demozero.net/roles'].includes('storeOwner') || user['http://demozero.net/roles'].includes('worker'))) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
