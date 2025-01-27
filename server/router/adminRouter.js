const express=require('express')
const adminRouter=express.Router()
const multer=require('multer')
const path=require('path')
const { addBridalWear,viewBridalWear, deleteBridalWear, editBridalWear, addJewellery, viewJewellery } = require('../controls/adminCtrl')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname))
    }
})

const uploads=multer({storage:storage})



adminRouter.route("/add-bridal-wear").post(uploads.array("images",5),addBridalWear)
adminRouter.route("/view-bridal-wear").get(viewBridalWear)
adminRouter.route("/delete-bridal-wear").delete(deleteBridalWear)
adminRouter.route("/edit-bridal-wear/:id").get(editBridalWear)
adminRouter.route("/add-bridal-jewellery").post(uploads.array("images",5),addJewellery)
adminRouter.route("/view-bridal-jewellery").get(viewJewellery)
module.exports=adminRouter