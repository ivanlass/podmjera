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
import ProtectedRoute from './pages/ProtectedRoute';
import StoreName from './pages/storeOwner/StoreName/StoreName';
import StorePickerPage from './pages/customer/StorePickerPage/StorePickerPage';
import OrdersPage from './pages/customer/OrdersPage/OrdersPage';

const App = () => {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path={ROUTE.HOME} element={<StorePickerPage />} />
        <Route path={ROUTE.STORE} element={<SpecificStore />} />
        <Route path={ROUTE.NAPLATA} element={<BillingProcedure />} />
        <Route path={ROUTE.ORDERSCUSTOMER} element={<OrdersPage />} />
        <Route
          path={ROUTE.NAME}
          element={
            <ProtectedRoute>
              <StoreName />
            </ProtectedRoute>
          }
        />
        <Route element={<Sidebar />}>
          <Route
            path={ROUTE.SETTINGS}
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTE.DASHBOARD}
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTE.CATEGORIES}
            element={
              <ProtectedRoute>
                <Categories />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTE.ARTICLES}
            element={
              <ProtectedRoute>
                <Items />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTE.ORDERS}
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path='*' element={<p>nema toga</p>} />
        {/* <Route path='*' element={<Navigate to='/404' replace />} /> */}
      </Routes>
    </>
  );
};

export default App;
