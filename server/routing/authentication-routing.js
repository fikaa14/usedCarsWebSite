const express=require("express");
const router=express.Router();

const authenticationController=require("./../controllers/authentication-controller");

router.route('/login')
    .post(authenticationController.login);

router.route('/register')
    .post(authenticationController.register);

router.route("/profile/:id")
    .get(authenticationController.profile)
    .put(authenticationController.editUser);

router.route("/user/:username")
    .get(authenticationController.userExists)

module.exports=router;