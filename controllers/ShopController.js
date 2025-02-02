const MettingModel = require("../models/ShopModel");

exports.ShopProduct = async (req, res) => {
    console.log('Request body:', req.body);
      console.log('Request file:', req.file);
    try {
      const { ProductName ,Description,Income,Kilogram  } = req.body; 
      const image = req.file ? req.file.path : null;
      const ShopData = new MettingModel({
        ProductName,
        Description,
        Income,
        image,
        Kilogram
      });
  
      await ShopData.save();
      res.status(201).json({
        message: "Create Product Shop successfully",
        document: ShopData,
      });
    } catch (error) {
      console.error("Error creating document:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  };

  exports.getShopProductById = async (req, res) => {
    try {
      const { productId } = req.params; 
      if (!productId) {
        return res.status(400).json({ error: "ProductName is required" });
      }
      const Product = await MettingModel.find({ productId: productId }); 
  
      if (Product.length === 0) {
        return res.status(404).json({ error: "No meetings found for this product" });
      }
      const { Income } = req.body; 
      if (Income) {
        for (let meeting of Product) {
          meeting.Income = Income; 
          await meeting.save(); 
        }
      }
      res.status(200).json({
        message: "Shop  Prodcut  fetched successfully",
        Product,
      });
    } catch (error) {
      console.error("Error fetching meetings:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  };
  exports.GetAllShopProduct = async (req, res) => {
    try {
      const Product = await MettingModel.find(); // Fetch all meetings from the database
      res.status(200).json({
        message: "Prodcut fetched successfully",
        Product,
      });
    } catch (error) {
      console.error("Error fetching meetings:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  };
  // Delete a specific product by ID
  exports.DeleteShopProduct = async (req, res) => {
    try {
      const productId = req.params.productId; 
        const deletedProduct = await MettingModel.findOneAndDelete({ productId });
      res.status(200).json({
        message: "Shop Product deleted successfully",
        deletedProduct,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  };

  
  
  exports.EditShopProduct = async (req, res) => {
    try {
      const { productId } = req.params;
      const { ProductName, Description, Income,Kilogram } = req.body;
      const updateData = { ProductName, Description, Income,Kilogram };
      if (req.file) {
        updateData.image = `${req.file.path}`; 
      }
       else {
        updateData.image = existingProduct.image; 
      }
        const updatedProduct = await MettingModel.findOneAndUpdate(
        { productId: productId }, 
        updateData,
        { new: true, runValidators: true }
      );
      res.status(200).json({
        message: "Product updated successfully",
        document: updatedProduct,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  };
  
  
  
