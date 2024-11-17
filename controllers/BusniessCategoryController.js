const BusniessCategoryModel = require("../models/BusniessCategory");

exports.BusniessCategory = async (req, res) => {
  try {
    console.log('File:', req.file);
    console.log('Body:', req.body);

    const { categoryName, categoryDescription } = req.body;
    const categoryImage = req.file?.path; // Ensure proper file handling

    const BusniessCategory = new BusniessCategoryModel({
      categoryName,
      categoryDescription,
      categoryImage,
    });

    await BusniessCategory.save();
    res.status(201).json({
      message: 'BusniessCategory created successfully',
      BusniessCategory,
    });
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ error: error.message || 'An unexpected error occurred' });
  }
};

  exports.getAllBusinessCategories = async (req, res) => {
    try {
        const businessCategories = await BusniessCategoryModel.find(); 
        res.status(200).json({
            message: "Business categories retrieved successfully",
            businessCategories:businessCategories
        });
    } catch (error) {
        console.error("Error retrieving documents:", error);
        res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
};
exports.deleteBusinessCategory = async (req, res) => {
  try {
      const { id } = req.params;
            const deletedCategory = await BusniessCategoryModel.findByIdAndDelete(id);

      if (!deletedCategory) {
          return res.status(404).json({
              message: "Business category not found",
          });
      }
      res.status(200).json({
          message: "Business category deleted successfully",
          deletedCategory,
      });
  } catch (error) {
      console.error("Error deleting document:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
  }
};
