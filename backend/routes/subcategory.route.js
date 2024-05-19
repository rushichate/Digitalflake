const express = require("express");
const { SubCategoryModel } = require("../models/subcategory.model");

const subCategoryRouter = express.Router();

// POST route to create a new item
subCategoryRouter.post("/add", async (req, res) => {
  try {
    const { categoryName, subCategory, status, imageUrl } = req.body;
    const newItem = new SubCategoryModel({ categoryName, subCategory, status, imageUrl });
    await newItem.save();
    res.status(201).json({ message: "Item created successfully", item: newItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to fetch all items
subCategoryRouter.get("/", async (req, res) => {
  try {
    const items = await SubCategoryModel.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT route to update an existing item
subCategoryRouter.put("/:itemId", async (req, res) => {
  const { categoryName, subCategory, status, imageUrl } = req.body;
  try {
    const updatedItem = await SubCategoryModel.findByIdAndUpdate(
      req.params.itemId,
      { categoryName, subCategory, status, imageUrl },
      { new: true }
    );
    res.status(200).json({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE route to delete an item
subCategoryRouter.delete("/:itemId", async (req, res) => {
  try {
    await SubCategoryModel.findByIdAndDelete(req.params.itemId);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  subCategoryRouter,
};
