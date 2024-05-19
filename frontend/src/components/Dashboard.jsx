import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Nav from './Nav';
import Warehouse from './Warehouse';
import Category from './Category';
import Subcategory from './Subcategory';
import "./Dashboard.css";

function Dashboard() {
  return (
    <>
      <Nav />
      <div className='dashboard-container'>
        <div className="sidebar">
          <h2><Link to="/dashboard">Home</Link></h2>
          <h2><Link to="/dashboard/category">Category</Link></h2>
          <h2><Link to="/dashboard/subcategory">Subcategory</Link></h2>
          <h2><Link to="/dashboard/warehouse">Products</Link></h2>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<img src="https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png" alt="Home" />} />
            <Route path="category" element={<Category />} />
            <Route path="subcategory" element={<Subcategory />} />
            <Route path="warehouse" element={<Warehouse />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
