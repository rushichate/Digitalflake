const mongoose = require("mongoose");

const subCategorySchema = mongoose.Schema(
  {
    categoryName: { type: String},
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

const SubCategoryModel = mongoose.model("subcategory", subCategorySchema);

module.exports = {
  SubCategoryModel,
};
