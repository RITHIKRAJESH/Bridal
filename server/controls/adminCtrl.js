// Importing the Bridal Model
const BridalModel = require('../models/bridalModel');
const JewelleryModel =require('../models/jewelleryModel')


// First crud for bridalwear from line 6 to 64

const addBridalWear = async (req, res) => {
    try {
        const { religion, occassion, gender, description } = req.body;

        // Parse description (if received as a string)
        const parsedDescription = JSON.parse(description);

        const newBridalWear = new BridalModel({
            religion,
            occassion,
            gender,
            images: req.files ? req.files.map((file) => file.path) : [],
            description: parsedDescription,
        });

        await newBridalWear.save();
        res.status(201).json({ message: 'Bridal wear added successfully!' });
    } catch (error) {
        console.error('Error adding bridal wear:', error);
        res.status(500).json({ message: 'Failed to add bridal wear.', error });
    }
};

const viewBridalWear=async(req, res) => {
    try {
      const data = await BridalModel.find();
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch bridal wear data." });
    }
  };


  const deleteBridalWear=async(req,res)=>{
    try{
        const id=req.headers._id
       await BridalModel.deleteOne({_id:id})
        res.json("Item deleted successfully")
    }
    catch(err){console.log(err)
        res.json("error occured while")
    }

  }


  const editBridalWear=async(req,res)=>{
        const { id } = req.params;
        const updatedData = req.body; // Get the updated data from the request body
        try {
          const bridalWear = await BridalWear.findByIdAndUpdate(id, updatedData, { new: true });
          res.json(bridalWear); // Send the updated bridal wear back
        } catch (err) {
          res.status(500).json({ message: 'Error updating bridal wear' });
        }
  }



//   Second crud for jewellery from line 70 to 

const addJewellery = async (req, res) => {
    try {
      // Extract the data from the request body
      const { name,price, gender, color, pieces, weight, fit } = req.body; 
      // Validate required fields
      if (!name || !price || !gender || !color || !pieces || !weight || !fit) {
        return res.status(400).json({ message: 'All required fields must be filled.' });
      }
      // Create a new jewellery document
      const newJewellery = new JewelleryModel({
        name,
        images: req.files ? req.files.map((file) => file.path) : [],
        price,
        gender,
        color,
        pieces,
        weight,
        fit,
      });
  
      // Save the document to the database
      const savedJewellery = await newJewellery.save();
  
      // Respond with the saved jewellery item
      return res.status(201).json({
        message: 'Jewellery added successfully.',
        jewellery: savedJewellery,
      });
    } catch (error) {
      console.error('Error adding jewellery:', error);
      return res.status(500).json({ message: 'Internal server error.' });
    }
  };
  

  const viewJewellery = async (req, res) => {
    try {
      // Fetch all jewellery documents from the database
      const jewellery = await JewelleryModel.find();
  
      // Check if any jewellery data exists
      if (!jewellery || jewellery.length === 0) {
        return res.status(404).json({ message: "No jewellery items found." });
      }
  
      // Respond with the jewellery data
      return res.status(200).json({
        message: "Jewellery items retrieved successfully.",
        jewellery,
      });
    } catch (error) {
      console.error("Error fetching jewellery data:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  };
  
 
  



module.exports = { addBridalWear,viewBridalWear,deleteBridalWear,editBridalWear,addJewellery,viewJewellery };


