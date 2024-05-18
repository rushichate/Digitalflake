const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    categoryName: { type: String},
    productName:{type:String},
    subCategory: { type: String},
    status: {
      type: String,
      enum: ["active", "inactive"],
      required: true,
    },
    imageUrl: { type: String },
  },
  {
    versionKey: false,
  }
);

const ItemModel = mongoose.model("Item", itemSchema);

module.exports = {
  ItemModel,
};
