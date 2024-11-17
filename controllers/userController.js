const MettingModel = require("../models/MettingModel");
const EmployeeAssetsDocSchema = require('../models/AssetsManagments')
const PerksDocument = require("../models/PerksDocuments");
const EmployeeDoc = require("../models/EmployeeDocument");













exports.assetsManagament = async (req, res) => {
  try {
    const { DailyIncome, EmployeeName, assetType, dateGiven,estimatedValue,serialNumber ,insuranceDetails} = req.body; // Get color from the body
    // Check if required fields are provided
    if (!DailyIncome || !EmployeeName || !assetType || !dateGiven || !estimatedValue ||!serialNumber || !insuranceDetails) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    console.log(DailyIncome, EmployeeName, assetType, dateGiven,estimatedValue,serialNumber,insuranceDetails ); 

    const newMetting = new EmployeeAssetsDocSchema({
      DailyIncome,
      EmployeeName,
      assetType,
      dateGiven, 
      estimatedValue,
      serialNumber,
      insuranceDetails  
    });

    await newMetting.save();
    res.status(201).json({
      message: "Assets  Share Employee ",
      document: newMetting,
    });
  } catch (error) {
    console.error("Error creating document:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred" });
  }
};


exports.getAssets = async (req, res) => {
  try {
    const assets = await EmployeeAssetsDocSchema.find();

    // Return the response
    res.status(200).json({
      message: "Assets retrieved successfully",
      assets: assets,
    });
  } catch (error) {
    console.error("Error retrieving assets:", error);
    res.status(500).json({
      error: "An error occurred while fetching assets",
    });
  }
};

// Get a specific meeting by DailyIncome
exports.getMeetingByDailyIncome = async (req, res) => {
  try {
    const { DailyIncome } = req.params; // Extract DailyIncome from request params
    const meeting = await MettingModel.findOne({ DailyIncome }); // Find the meeting by DailyIncome

    if (!meeting) {
      return res.status(404).json({ error: "Meeting not found for this employee" });
    }

    res.status(200).json({
      message: "Meeting fetched successfully",
      meeting,
    });
  } catch (error) {
    console.error("Error fetching meeting:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred" });
  }
};
exports.editPerks = async (req, res) => {
  try {
    const { title, url, description } = req.body;
    const image = req.file ? req.file.path : null;

    if (!title && !description && !url) {
      return res
        .status(400)
        .json({ error: "At least one field must be provided to update" });
    }

    const perksDocument = await PerksDocument.findById(req.params.id);
    if (!perksDocument) {
      return res.status(404).json({ error: "Document not found" });
    }

    perksDocument.title = title || perksDocument.title;
    perksDocument.description = description || perksDocument.description;
    perksDocument.url = url || perksDocument.url;
    if (image) perksDocument.image = image;

    await perksDocument.save();

    res.status(200).json({
      message: "Document updated successfully",
      document: perksDocument,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const documents = await PerksDocument.find();
    res.status(200).json({
      message: "Documents fetched successfully",
      documents, // Send the fetched documents as a response
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

exports.employeeDocument = async (req, res) => {
  try {
    const {  documentType, uploadDate, state, uploaded } =
      req.body;
    const documentFile = req.file ? req.file.path : null;
   
    const validUploadDate = new Date(uploadDate);
    if (isNaN(validUploadDate.getTime())) {
      return res.status(400).json({ error: "Invalid upload date" });
    }
    console.log("Received data:", {
     
      documentType,
      uploadDate,
      state,
      documentFile,
      uploaded,
    });
    const newDocument = new EmployeeDoc({
     
      documentType,
      uploadDate: validUploadDate,
      state,
      documentFile,
      uploaded,
    });
    await newDocument.save();
    res.status(201).json({
      message: "Document created successfully",
      document: newDocument,
    });
  } catch (error) {
    console.error("Error creating document:", error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred" });
  }
};


exports.getEmployeeDocuments = async (req, res) => {
  try {
    // Fetch all documents from the EmployeeDoc collection
    const documents = await EmployeeDoc.find();
    
    // Return the documents in the response
    res.status(200).json({
      message: "Documents fetched successfully",
      documents: documents,
    });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ error: error.message || "An unexpected error occurred" });
  }
};
















