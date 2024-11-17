const Contact = require("../models/Contect");

exports.CreateContact = async (req, res) => {
    try {
      const { Name, Email, Mobile, Comments,Subject } = req.body; // Get color from the body
      const newContact = new Contact({
        Name,
        Email,
        Mobile,
        Comments, 
        Subject,  
      });
  
      await newContact.save();
      res.status(201).json({
        message: "Document created successfully",
        document: newContact,
      });
    } catch (error) {
      console.error("Error creating document:", error);
      res.status(500).json({ error: error.message || "An unexpected error occurred" });
    }
  };