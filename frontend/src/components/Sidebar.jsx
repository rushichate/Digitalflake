import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar">
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/warehouse">Warehouse</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;
