const express = require("express");
const { CategoryModel } = require("../models/category.model");


const categoryRouter = express.Router();

// POST route to create a new item
categoryRouter.post("/add", async (req, res) => {
  try {
    const { categoryName,status, imageUrl } = req.body;
    const newItem = new CategoryModel({ categoryName, status, imageUrl });
    await newItem.save();
    res.status(201).json({ message: "Item created successfully", item: newItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to fetch all items
categoryRouter.get("/", async (req, res) => {
  try {
    const items = await CategoryModel.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT route to update an existing item
categoryRouter.put("/:itemId", async (req, res) => {
  const { categoryName, status, imageUrl } = req.body;
  try {
    const updatedItem = await CategoryModel.findByIdAndUpdate(
      req.params.itemId,
      { categoryName, status, imageUrl },
      { new: true }
    );
    res.status(200).json({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE route to delete an item
categoryRouter.delete("/:itemId", async (req, res) => {
  try {
    await CategoryModel.findByIdAndDelete(req.params.itemId);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  categoryRouter,
};
