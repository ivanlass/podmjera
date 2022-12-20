import { Box } from '@chakra-ui/react';
import Dashboard from './pages/storeOwner/Dashboard/Dashboard';
import Items from './pages/storeOwner/Items/Items';
import Orders from './pages/storeOwner/Orders/Orders';

const App = () => {
  return (
    <Box>
      <Items />
      {/* <Dashboard /> */}
    </Box>
  );
};

export default App;
