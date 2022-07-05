const express=require("express");
const router=express.Router();

const vehicleController=require("./../controllers/vehicle-controller");

router.route('/')
    .get(vehicleController.getAllVehicles) //dobija sva raspoloziva voziala
    .post(vehicleController.insertVehicle) //unosi novo vozilo u bazu podataka

router.route('/by-manufactor-name/:name')
    .get(vehicleController.findVehiclesByManufactorName)

router.route('/by-price-range')
    .post(vehicleController.findVehiclesByPriceRange)

router.route('/by-user/:id')
    .get(vehicleController.findVehiclesFromUser)


router.route('/:id')
    .get(vehicleController.getVehicleByID) //dobija odredjeno auto po id-u
    .put(vehicleController.updateVehicle) //updejtuje podatke o autu
    .delete(vehicleController.deleteVehicle) //brise auto iz baze

module.exports=router;