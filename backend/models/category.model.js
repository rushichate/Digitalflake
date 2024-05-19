const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    categoryName: { type: String},
    status: {
      type: String,
      enum: ["active", "inactive"]
    },
    imageUrl: { type: String },
  },
  {
    versionKey: false,
  }
);

const CategoryModel = mongoose.model("category", categorySchema);

module.exports = {
  CategoryModel,
};
