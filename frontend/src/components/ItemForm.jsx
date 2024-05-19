import React, { useState, useEffect } from 'react';
import axiosInstance from './axiosInstance';
import "./ItemForm.css"

function ItemForm({ fetchItems, itemToEdit, setItemToEdit }) {
  const [productName, setProductName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setProductName(itemToEdit.productName);
      setImageUrl(itemToEdit.imageUrl);
      setSubCategory(itemToEdit.subCategory);
      setCategoryName(itemToEdit.categoryName);
      setStatus(itemToEdit.status);
    }
  }, [itemToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (itemToEdit) {
        // Update item
        await axiosInstance.put(`/items/${itemToEdit._id}`, {
          productName,
          imageUrl,
          subCategory,
          categoryName,
          status,
        });
      } else {
        // Add new item
        await axiosInstance.post('/items/add', {
          productName,
          imageUrl,
          subCategory,
          categoryName,
          status,
        });
      }
      fetchItems();
      setItemToEdit(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="productName">Product Name:</label>
      <input
        type="text"
        id="productName"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
      <label htmlFor="imageUrl">Image URL:</label>
      <input
        type="text"
        id="imageUrl"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <label htmlFor="subCategory">Subcategory:</label>
      <input
        type="text"
        id="subCategory"
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
        required
      />
      <label htmlFor="categoryName">Category:</label>
      <input
        type="text"
        id="categoryName"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        required
      />
      <label htmlFor="status">Status (active,inactive):</label>
      <input
        type="text"
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      />
      <button id='add' type="submit">{itemToEdit ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
}

export default ItemForm;
