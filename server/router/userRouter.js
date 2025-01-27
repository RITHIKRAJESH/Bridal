const express=require('express')
const { userRegister,viewBridalWear, userLogin, viewbridalproduct, viewJewellery, viewJewellerySingle, addCart, viewcart } = require('../controls/userctrl')
const verifytoken = require('../middleware/token')
const userRouter=express.Router()




userRouter.route("/view-bridal-wear").get(verifytoken,viewBridalWear)
userRouter.route("/register-user").post(userRegister)
userRouter.route("/login-user").post(userLogin)
userRouter.route("/view-products/:id").get(viewbridalproduct)
userRouter.route("/view-jewellery-user").get(viewJewellery)
userRouter.route("/view-jewellery/:id").get(viewJewellerySingle)
userRouter.route("/addcart").post(verifytoken,addCart)
userRouter.route("/viewcart").get(viewcart)
module.exports=userRouter