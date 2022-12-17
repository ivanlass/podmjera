import { Box, Button, Input } from '@chakra-ui/react';
import StoreCard from '../../components/StoreCard';

function SuperAdminDashboard() {
  return (
    <Box h='100vh' px={4} py={4}>
      <Box display='flex' alignItems='flex-end' flexDir='column' mb={8}>
        <Box w={{ base: '100%', md: '20%' }}>
          <Input placeholder='Email' mb={4} />
          <Button variant='solid' w='100%'>
            Invite
          </Button>
        </Box>
      </Box>
      <StoreCard />
      <StoreCard />
      <StoreCard />
    </Box>
  );
}

export default SuperAdminDashboard;
