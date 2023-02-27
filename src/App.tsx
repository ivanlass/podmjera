import { Box } from '@chakra-ui/react';
import BillingProcedure from './pages/customer/BillingProcedure/BillingProcedure';
import SpecificStore from './pages/customer/SpecificStore/SpecificStore';
import Categories from './pages/storeOwner/Categories/Categories';
import Dashboard from './pages/storeOwner/Dashboard/Dashboard';
import Items from './pages/storeOwner/Items/Products';
import Settings from './pages/storeOwner/Settings';

const App = () => {
  return (
    <Box>
      {/* <SpecificStore /> */}
      {/* <Categories /> */}
      {/* <Dashboard /> */}
      {/* <Items /> */}
      {/* <Settings /> */}
      <BillingProcedure />
    </Box>
  );
};

export default App;
