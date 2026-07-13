import { Routes, Route } from 'react-router-dom';

// components
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

// pages
import Add from '../pages/Add';
import FAQ from '../pages/FAQ';
import Home from '../pages/Home';
import Cards from '../pages/Cards';
import Inbox from '../pages/Inbox';
import Loans from '../pages/Loans';
import Details from '../pages/Details';
import PinUnlock from '../pages/PinUnlock';
import Signin from '../pages/Signin';
import Profile from '../pages/Profile';
import Savings from '../pages/Savings';
import Support from '../pages/Support';
import Transfer from '../pages/Transfer';
import Requisites from '../pages/Requisites';
import Statements from '../pages/Statements';
import Transactions from '../pages/Transactions';
import TransactionDetail from '../pages/TransactionDetail';

const Navigation: React.FC = () => (
  <Routes>
    <Route path='/' element={<PinUnlock />} />
    <Route path='/signin' element={<Signin />} />
    <Route
      path='/add'
      element={
        <ProtectedRoute>
          <Add />
        </ProtectedRoute>
      }
    />
    <Route
      path='/home'
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
    <Route
      path='/cards'
      element={
        <ProtectedRoute>
          <Cards />
        </ProtectedRoute>
      }
    />
    <Route
      path='/details'
      element={
        <ProtectedRoute>
          <Details />
        </ProtectedRoute>
      }
    />
    <Route
      path='/faq'
      element={
        <ProtectedRoute>
          <FAQ />
        </ProtectedRoute>
      }
    />
    <Route
      path='/inbox'
      element={
        <ProtectedRoute>
          <Inbox />
        </ProtectedRoute>
      }
    />
    <Route
      path='/loans'
      element={
        <ProtectedRoute>
          <Loans />
        </ProtectedRoute>
      }
    />
    <Route
      path='/profile'
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path='/savings'
      element={
        <ProtectedRoute>
          <Savings />
        </ProtectedRoute>
      }
    />
    <Route
      path='/support'
      element={
        <ProtectedRoute>
          <Support />
        </ProtectedRoute>
      }
    />
    <Route
      path='/transfer'
      element={
        <ProtectedRoute>
          <Transfer />
        </ProtectedRoute>
      }
    />
    <Route
      path='/requisites'
      element={
        <ProtectedRoute>
          <Requisites />
        </ProtectedRoute>
      }
    />
    <Route
      path='/statements'
      element={
        <ProtectedRoute>
          <Statements />
        </ProtectedRoute>
      }
    />
    <Route
      path='/transactions'
      element={
        <ProtectedRoute>
          <Transactions />
        </ProtectedRoute>
      }
    />
    <Route
      path='/transaction/:id'
      element={
        <ProtectedRoute>
          <TransactionDetail />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default Navigation;
