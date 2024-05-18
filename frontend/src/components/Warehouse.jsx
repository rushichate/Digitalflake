import React from 'react';
import { Link } from 'react-router-dom';

function Warehouse() {
    return (
        <div className="warehouse">
            <h2>Warehouse</h2>
            <ul>
                <li><Link to="/category">Category</Link></li>
                <li><Link to="/subcategory">Subcategory</Link></li>
                <li><Link to="/projects">Projects</Link></li>
            </ul>
            <p>Select a category to manage</p>
        </div>
    );
}

export default Warehouse;
