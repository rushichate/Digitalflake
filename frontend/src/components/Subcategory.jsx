import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance'; // Import the axios instance
import './Subcategory.css';
import SubcategoryForm from './SubcategoryForm';

function Subcategory() {
  const [items, setItems] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axiosInstance.get('/subcategory/');
      setItems(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await axiosInstance.delete(`/subcategory/${itemId}`);
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
    <div className='data'>
      <div className='search'>
        <h2>Subcategory</h2>
        <input type="text" placeholder='Search'/>
        {!isFormVisible && <button onClick={handleAddNew}>Add New</button>}
      </div>
      {isFormVisible ? (
        <div className='form-container'>
          <SubcategoryForm fetchItems={fetchItems} itemToEdit={itemToEdit} setItemToEdit={setItemToEdit} onSubmit={handleFormSubmit} />
          <button onClick={handleCloseForm}>Close Form</button>
        </div>
      ) : (
        <>
          <h2>Item List</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Id</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Subcategory</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Image</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item._id}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.subCategory}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.categoryName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                    {item.imageUrl && <img src={item.imageUrl} alt="Item" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
                  </td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.status}</td>
                  <td style={{ width: "30%", border: '1px solid #ddd', padding: '8px', margin: "auto" }}>
                    <button style={{ width: "40%", marginRight: '10px' }} onClick={() => handleEdit(item)}>Edit</button>
                    <button style={{ width: "40%" }} onClick={() => handleDelete(item._id)}>Delete</button>
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

export default Subcategory;
