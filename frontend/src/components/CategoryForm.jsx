import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';

function CategoryForm({ fetchItems, itemToEdit, setItemToEdit, onSubmit }) {
  const [formData, setFormData] = useState({
    categoryName: '',
    imageUrl: '',
    status: '',
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        categoryName: itemToEdit.categoryName,
        imageUrl: itemToEdit.imageUrl,
        status: itemToEdit.status,
      });
    } else {
      setFormData({
        categoryName: '',
        imageUrl: '',
        status: '',
      });
    }
  }, [itemToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (itemToEdit) {
        await axiosInstance.put(`/category/${itemToEdit._id}`, formData);
      } else {
        await axiosInstance.post('/category/add', formData);
      }
      fetchItems();
      setItemToEdit(null);
      onSubmit(); // Call onSubmit to hide the form and show the data table
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
       <label>
        Category:
        <input type="text" name="categoryName" value={formData.categoryName} onChange={handleChange} />
      </label>
      <label>
        Image URL:
        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
      </label>
      <label>
        Status:
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Select</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default CategoryForm;
