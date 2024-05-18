const express = require("express");
const { ItemModel } = require("../models/item.model");

const itemRouter = express.Router();

// POST route to create a new item
itemRouter.post("/add", async (req, res) => {
  try {
    const { categoryName, productName, subCategory, status, imageUrl } = req.body;
    const newItem = new ItemModel({ categoryName, productName, subCategory, status, imageUrl });
    await newItem.save();
    res.status(201).json({ message: "Item created successfully", item: newItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET route to fetch all items
itemRouter.get("/", async (req, res) => {
  try {
    const items = await ItemModel.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT route to update an existing item
itemRouter.put("/:itemId", async (req, res) => {
  const { categoryName, productName, subCategory, status, imageUrl } = req.body;
  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(
      req.params.itemId,
      { categoryName, productName, subCategory, status, imageUrl },
      { new: true }
    );
    res.status(200).json({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE route to delete an item
itemRouter.delete("/:itemId", async (req, res) => {
  try {
    await ItemModel.findByIdAndDelete(req.params.itemId);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  itemRouter,
};
