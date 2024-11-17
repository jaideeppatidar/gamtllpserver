const MettingModel = require("../models/MettingModel");

exports.productAdd = async (req, res) => {
    console.log('Request body:', req.body);
      console.log('Request file:', req.file);
  
  
    try {
      const { ProductName ,Description,Income,Persantage  } = req.body; // Get color from the body
      const image = req.file ? req.file.path : null;
      const newMetting = new MettingModel({
        ProductName,
        Description,
        Income,
        Persantage,
        image
      });
  
      await newMetting.save();
      res.status(201).json({
        message: "Create Product  successfully",
        document: newMetting,
      });
    } catch (error) {
      console.error("Error creating document:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  };
  exports.getProductByProductId = async (req, res) => {
    try {
      const { productId } = req.params; 
      if (!productId) {
        return res.status(400).json({ error: "ProductName is required" });
      }
      const meetings = await MettingModel.find({ productId: productId }); 
  
      if (meetings.length === 0) {
        return res.status(404).json({ error: "No meetings found for this product" });
      }
      const { Income } = req.body; // Get Income value from the request body
      if (Income) {
        for (let meeting of meetings) {
          meeting.Income = Income;  // Assign the value to the Income field of the meeting document
          await meeting.save(); // Save each meeting document with updated Income value
        }
      }
      res.status(200).json({
        message: "Prodcut  fetched successfully",
        meetings,
      });
    } catch (error) {
      console.error("Error fetching meetings:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  };
  exports.GetAllProduct = async (req, res) => {
    try {
      const meetings = await MettingModel.find(); // Fetch all meetings from the database
      res.status(200).json({
        message: "Prodcut fetched successfully",
        meetings,
      });
    } catch (error) {
      console.error("Error fetching meetings:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  };
  // Delete a specific product by ID
  exports.DeleteProduct = async (req, res) => {
    try {
      const productId = req.params.productId; 
        const deletedProduct = await MettingModel.findOneAndDelete({ productId });
      res.status(200).json({
        message: "Product deleted successfully",
        deletedProduct,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  };
  
  
