import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import NewsPage from './components/NewsPage';
import Navbar from './components/Navbar';
import PhoneList from './components/PhoneList';
import AddPhoneForm from './components/AddPhoneForm';
import PhoneDetails from './components/PhoneDetails';
import SignUpForm from './components/signupform';
import Login from './components/Login';
import AddNewsForm from './components/AddNewsForm';
import TrendingPhones from './components/TrendingPhones';
import PhoneFinderForm from './components/PhoneFinderForm';
import ValueForMoney from './components/ValueForMoney';
import Wishlist from './components/Wishlist'
import Notifications from './components/Notifications'
import Benchmark from './components/Benchmark';
import FaqPage from './components/FaqPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import './App.css';

function AppLayout() {
  const [isAddPhoneFormOpen, setIsAddPhoneFormOpen] = useState(false);
  const [isAddNewsFormOpen, setIsAddNewsFormOpen] = useState(false);
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPhoneFinderOpen, setIsPhoneFinderOpen] = useState(false);
  const [filters, setFilters] = useState({ search: '', brand: '', sort: '' });

  const handlePhoneSearch = (searchParams) => {
    setFilters(searchParams);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdTokenResult();
        setIsAdmin(token.claims.admin === true);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openAddPhoneForm = () => setIsAddPhoneFormOpen(true);
  const closeAddPhoneForm = () => setIsAddPhoneFormOpen(false);
  const openAddNewsForm = () => setIsAddNewsFormOpen(true);
  const closeAddNewsForm = () => setIsAddNewsFormOpen(false);
  const openPhoneFinder = () => setIsPhoneFinderOpen(true);
  const closePhoneFinder = () => setIsPhoneFinderOpen(false);

  return (
    <div>
      <Navbar isAdmin={isAdmin} isLoading={isLoading} onOpenPhoneFinder={openPhoneFinder}/>

      <PhoneFinderForm
        isOpen={isPhoneFinderOpen}
        onClose={closePhoneFinder}
        onSearch={handlePhoneSearch}
      />

      {isAddPhoneFormOpen && (
        <AddPhoneForm isOpen={isAddPhoneFormOpen} closeModal={closeAddPhoneForm} />
      )}
      {isAddNewsFormOpen && (
        <AddNewsForm isOpen={isAddNewsFormOpen} closeModal={closeAddNewsForm} />
      )}

      <div style={{ display: 'flex' }}>
        <div style={{ width: '300px', padding: '1rem', borderRight: '1px solid #ccc' }}>
          <TrendingPhones />
          <div style={{ marginTop: '1rem' }}> 
          <ValueForMoney /> {/* Add the ValueForMoney component here */}
          </div>
        </div>

        <div style={{ flex: 1, padding: '1rem' }}>
          <Routes>
            <Route path="/home" element={<PhoneList openAddPhoneForm={openAddPhoneForm} filters={filters}/>} />
            <Route path="/phone/:phoneId" element={<PhoneDetails />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/benchmark" element={<Benchmark />} />
            <Route path="/faq" element={<FaqPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

// Root App
function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/trending" element={<TrendingPhones />} />
        <Route path="/valueformoney" element={<ValueForMoney />} />


        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}
export default App;
