import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance'; // Import the axios instance
import './Warehouse.css';
import ItemForm from './ItemForm';

function Warehouse() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get('/items/');
      setItems(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axiosInstance.delete(`/items/${itemId}`);
      fetchItems();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = (item) => {
    setItemToEdit(item);
    setIsFormVisible(true);
  };

  const handleAddNew = () => {
    setItemToEdit(null);
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  const handleFormSubmit = () => {
    setIsFormVisible(false);
    fetchItems();
  };

  return (
    <div className='warehouse-container'>
      <div className='search-bar'>
        <h2>Products</h2>
        <input type="text" placeholder='Search'/>
        {!isFormVisible && <button onClick={handleAddNew}>Add New</button>}
      </div>
      {isFormVisible ? (
        <div className='form-container'>
          <ItemForm fetchItems={fetchItems} itemToEdit={itemToEdit} setItemToEdit={setItemToEdit} onSubmit={handleFormSubmit} />
          <button onClick={handleCloseForm}>Close Form</button>
        </div>
      ) : (
        <>
          <h2>Item List</h2>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Product name</th>
                <th>Image</th>
                <th>Subcategory</th>
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item.productName}</td>
                  <td>{item.imageUrl && <img src={item.imageUrl} alt="Item" />}</td>
                  <td>{item.subCategory}</td>
                  <td>{item.categoryName}</td>
                  <td>{item.status}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEdit(item)}>Edit</button>
                    <button className="delete-button" onClick={() => handleDelete(item._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Warehouse;
