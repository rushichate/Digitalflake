import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css';
import LoginSignup from './components/LoginSignup';
import Dashboard from './components/Dashboard';
import Warehouse from './components/Warehouse';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<LoginSignup/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/dashboard/warehouse' element={<Warehouse/>}/>
      </Routes>
    </Router>
    
    </>
  );
}

export default App;