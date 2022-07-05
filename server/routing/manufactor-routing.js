const express=require("express");
const router=express.Router();

const manufactorController=require("./../controllers/manufactor-controller");

router.route("/")
    .get(manufactorController.getAllManufactors);

router.route("/active")
    .get(manufactorController.getAllActiveManufactors)

router.route("/get-id/:name")
    .get(manufactorController.getIdByName)

module.exports=router