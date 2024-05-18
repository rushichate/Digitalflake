import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemForm({ fetchItems, itemToEdit, setItemToEdit }) {
  const [productName, setProductName] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [status, setStatus] = useState('Valid');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (itemToEdit) {
      setProductName(itemToEdit.productName);
      setCategoryName(itemToEdit.categoryName);
      setSubCategory(itemToEdit.subCategory);
      setStatus(itemToEdit.status);
      setImageUrl(itemToEdit.imageUrl);
    }
  }, [itemToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newItem = {
      productName,
      categoryName,
      subCategory,
      status,
      imageUrl,
    };

    try {
      if (itemToEdit) {
        await axios.put(`http://localhost:8000/items/${itemToEdit._id}`, newItem);
      } else {
        await axios.post('http://localhost:8000/items/add', newItem);
      }
      fetchItems();
      clearForm();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const clearForm = () => {
    setProductName('');
    setCategoryName('');
    setSubCategory('');
    setStatus('Valid');
    setImageUrl('');
    setItemToEdit(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Subcategory"
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)} required>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit">{itemToEdit ? 'Update Item' : 'Add Item'}</button>
    </form>
  );
}

export default ItemForm;
