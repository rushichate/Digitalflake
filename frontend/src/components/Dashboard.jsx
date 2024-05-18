import React from 'react';
import Nav from './Nav';
import "./Dashboard.css";
import { useNavigate } from 'react-router-dom';
function Home() {
 const navigate = useNavigate()

    function handleClick() {
       navigate("./warehouse")
    }
    return (
        <>
        <Nav/>
        <div className='main'>
        <div className="home">
            <h2>Home</h2>
            <h2>State</h2>
            <h2>City</h2>
            <h2 onClick={handleClick}>Warehouse</h2>
        </div>
        <img src="https://digitalflake.com/wp-content/uploads/2023/04/DF_logo-transparent2.png" alt="" />
        </div>
        </>
    );
}

export default Home;
