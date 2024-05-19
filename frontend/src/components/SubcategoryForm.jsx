import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';

function SubcategoryForm({ fetchItems, itemToEdit, setItemToEdit, onSubmit }) {
  const [formData, setFormData] = useState({
    subCategory: '',
    categoryName: '',
    imageUrl: '',
    status: '',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        subCategory: itemToEdit.subCategory,
        categoryName: itemToEdit.categoryName,
        imageUrl: itemToEdit.imageUrl,
        status: itemToEdit.status,
      });
    } else {
      setFormData({
        subCategory: '',
        categoryName: '',
        imageUrl: '',
        status: '',
      });
    }
  }, [itemToEdit]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/category/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (itemToEdit) {
        await axiosInstance.put(`/subcategory/${itemToEdit._id}`, formData);
      } else {
        await axiosInstance.post('/subcategory/add', formData);
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
        Subcategory:
        <input type="text" name="subCategory" value={formData.subCategory} onChange={handleChange} />
      </label>
      <label>
        Category:
        <select name="categoryName" value={formData.categoryName} onChange={handleChange}>
          <option>Select</option>
          {categories.map((category) => (
            <option key={category._id} value={category.categoryName}>
              {category.categoryName}
            </option>
          ))}
        </select>
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

export default SubcategoryForm;
