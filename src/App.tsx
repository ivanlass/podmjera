import BillingProcedure from './pages/customer/BillingProcedure/BillingProcedure';
import SpecificStore from './pages/customer/SpecificStore/SpecificStore';
import Categories from './pages/storeOwner/Categories/Categories';
import Dashboard from './pages/storeOwner/Dashboard/Dashboard';
import Items from './pages/storeOwner/Items/Products';
import Settings from './pages/storeOwner/Settings';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import { ROUTE } from './interfaces/routes.interface';
import Sidebar from './components/Sidebar';
import Orders from './pages/storeOwner/Orders/Orders';

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path='store/:store' element={<SpecificStore />} />
        <Route path='store/:store/naplata' element={<BillingProcedure />} />
        <Route element={<Sidebar />}>
          <Route path={ROUTE.SETTINGS} element={<Settings />} />
          <Route path={ROUTE.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTE.CATEGORIES} element={<Categories />} />
          <Route path={ROUTE.ARTICLES} element={<Items />} />
          <Route path={ROUTE.ORDERS} element={<Orders />} />
        </Route>
        <Route path='*' element={<p>nema toga</p>} />
        {/* <Route path='*' element={<Navigate to='/404' replace />} /> */}
      </Routes>
    </>
  );
};

export default App;
