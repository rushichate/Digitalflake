import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import './ItemForm.css';

function ItemForm({ fetchItems, itemToEdit, setItemToEdit, onSubmit }) {
  const [formData, setFormData] = useState({
    productName: '',
    imageUrl: '',
    subCategory: '',
    categoryName: '',
    status: '',
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        productName: itemToEdit.productName,
        imageUrl: itemToEdit.imageUrl,
        subCategory: itemToEdit.subCategory,
        categoryName: itemToEdit.categoryName,
        status: itemToEdit.status,
      });
    } else {
      setFormData({
        productName: '',
        imageUrl: '',
        subCategory: '',
        categoryName: '',
        status: '',
      });
    }
  }, [itemToEdit]);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/category/');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const response = await axiosInstance.get('/subcategory/');
      setSubCategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (itemToEdit) {
        await axiosInstance.put(`/items/${itemToEdit._id}`, formData);
      } else {
        await axiosInstance.post('/items/add', formData);
      }
      fetchItems();
      setItemToEdit(null);
      onSubmit(); // Call onSubmit to hide the form and show the data table
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="item-form">
      <label>
        Product Name:
        <input type="text" name="productName" value={formData.productName} onChange={handleChange} />
      </label>
      <label>
        Image URL:
        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
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
        Subcategory:
        <select name="subCategory" value={formData.subCategory} onChange={handleChange}>
          <option>Select</option>
          {subCategories.map((subCategory) => (
            <option key={subCategory._id} value={subCategory.subCategory}>
              {subCategory.subCategory}
            </option>
          ))}
        </select>
      </label>
      <label>
        Status:
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>Select</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
}

export default ItemForm;
