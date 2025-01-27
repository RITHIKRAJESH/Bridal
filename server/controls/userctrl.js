const BridalModel = require('../models/bridalModel');
const JewelleryModel =require('../models/jewelleryModel')
const userModel=require('../models/userModel')
const cartModel=require('../models/cartModel')
const bcrypt=require('bcrypt')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')

const userRegister = async (req, res) => {
  const { email, firstName, lastName, phone, password } = req.body;
  console.log(req.body)
  try {
    // Check if the user already exists
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(400).json("User already exists");
    }

    // Hash the password
    const saltRounds = 10;
    const hashpassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const regform = new userModel({
      firstName,
      lastName,
      email,
      password: hashpassword,
      phone,
      role: "user",
    });

    // Save the user to the database
    await regform.save();

    // Send success response
    res.status(200).json("Registration Successful");
  } catch (err) {
    console.error(err);
    res.status(500).json("An error occurred during registration");
  }
};


const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token=jwt.sign({data:user},'authen',{expiresIn:'1h'})
    res.status(200).json({
      message: "Login successful",
      token:token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "An error occurred during login" });
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

  const viewbridalproduct=async(req, res) => {
    try {
      const id=req.params.id
      const data = await BridalModel.find({_id:id});
      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to fetch bridal wear data." });
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

  const viewJewellerySingle = async (req, res) => {
    try {
      // Fetch all jewellery documents from the database
      const id=req.params.id
      const jewellery = await JewelleryModel.find({_id:id});
  
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

  const addCart=async(req,res)=>{
    const {productId,quantity,size}=req.body
    const token=req.headers.token
    const user=jwt.decode(token)
    const userId=user.data._id
    console.log(userId,productId,quantity,"size:",size)
    try{
        let cart=await cartModel.findOne({userId:userId})
        if(cart){
            const itemIndex= cart.items.findIndex(item=>item.productId==productId)
            console.log(itemIndex)
            if(itemIndex > -1){
                cart.items[itemIndex].quantity += quantity;
            }else{
                cart.items.push({productId,quantity,size})
            }
        }
        else{
            cart=new cartModel({
                userId,
                items:[{productId,quantity,size}]
            })
        }
        await cart.save()
        res.json({message:"producted added to cart"}).status(200)
    }
    catch(err){
        res.json("error occured").status(500)
        console.log(err)
    }
}

const viewcart=async(req, res) => {
  // console.log(req.headers)
  const token=req.headers.token
    const user=jwt.decode(token)
    console.log(user)
    const userId=user.data._id
  // console.log(userId)
  try {
  //   const cart = await cartModel.findOne({ userId })
  //   .populate("userId", "email") // Populate user details
  //   .populate("items.productId", "price images"); // Populate product details

  //   if (!cart) {
  //     return res.status(404).json({ message: "Cart not found" });
  //   }
  //   console.log(cart)
  //   res.status(200).json(cart);
  // } catch (err) {
  //   console.error("Error fetching cart:", err);
  //   res.status(500).json({ message: "Server error", error: err.message });
  // }

  const cart = await cartModel.aggregate([
    { $match: { userId:new mongoose.Types.ObjectId(userId) } }, // Match the cart by userId
    {
      $lookup: {
        from: "bridal_tbls", // Collection name for products
        localField: "items.productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $lookup: {
        from: "user_tbls", // Collection name for users
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    { $unwind: "$userDetails" }, // Unwind the user details if it's a single object
  ]);

   res.json(cart);
} catch(error){
  console.error("Error fetching data with aggregation:", error);
  throw error;
}
}

  module.exports={viewBridalWear,userRegister,userLogin,viewbridalproduct,viewJewellery,viewJewellerySingle,addCart,viewcart}