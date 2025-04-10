import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PhoneList from './components/PhoneList';
import AddPhoneForm from './components/AddPhoneForm';
import PhoneDetails from './components/PhoneDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <h1>Mobile Benchmarking System 📱</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AddPhoneForm />
                <PhoneList />
              </>
            }
          />
          <Route path="/phone/:phoneId" element={<PhoneDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
