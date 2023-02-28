import { Box } from '@chakra-ui/react';
import BillingProcedure from './pages/customer/BillingProcedure/BillingProcedure';
import SpecificStore from './pages/customer/SpecificStore/SpecificStore';
import Categories from './pages/storeOwner/Categories/Categories';
import Dashboard from './pages/storeOwner/Dashboard/Dashboard';
import Items from './pages/storeOwner/Items/Products';
import Settings from './pages/storeOwner/Settings';
import { Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <Box>
      <Routes>
        <Route path='store/:store' element={<SpecificStore />} />
        <Route path='store/:store/naplata' element={<BillingProcedure />} />
        <Route path='store/:store/postavke' element={<Settings />} />
        <Route path='store/:store/dashboard' element={<Dashboard />} />
        <Route path='store/:store/kategorije' element={<Categories />} />
        <Route path='store/:store/artikli' element={<Items />} />
        <Route path='*' element={<p>nema toga</p>} />
        {/* <Route path='*' element={<Navigate to='/404' replace />} /> */}
      </Routes>
    </Box>
  );
};

export default App;
