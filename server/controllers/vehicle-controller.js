const vehicleRepository=require('./../repositories/vehicle-repository');

const getAllVehicles=async (req, res) => {
    const results=await vehicleRepository.getAllVehicles();
    res.send(results);
};

const getVehicleByID=async (req, res) => {
    const id=req.params.id;
    const results=await vehicleRepository.getVehicleByID(id);
    res.send(results);
};

const insertVehicle=async (req, res) => {
    const id=await vehicleRepository.insertVehicle({
        carBody: req.body.carBody,
        horsePower: req.body.horsePower,
        engine: req.body.engine,
        mileage: req.body.mileage,
        price: req.body.price,
        imgPath: req.body.imgPath,
        transmission: req.body.transmission,
        productionYear: req.body.productionYear,
        description: req.body.description,
        user_id: req.body.user_id,
        manufactor_id: req.body.manufactor_id
    });
    res.send({ id });
};

const updateVehicle=async (req, res) => {
    const result=await vehicleRepository.updateVehicle({
        carBody: req.body.carBody,
        horsePower: req.body.horsePower,
        engine: req.body.engine,
        mileage: req.body.mileage,
        price: req.body.price,
        transmission: req.body.transmission,
        productionYear: req.body.productionYear,
        description: req.body.description,
        user_id: req.body.user_id,
        manufactor_id: req.body.manufactor_id
    }, req.params.id);
    res.send(result);
};

const deleteVehicle=async (req, res) => {
    const result=await vehicleRepository.deleteVehicle(req.params.id);
    res.send(result);
};

const findVehiclesByManufactorName=async (req, res) => {
    const result=await vehicleRepository.findVehiclesByManufactorName(req.params.name);
    res.send(result);
}

const findVehiclesByPriceRange=async (req, res) => {
    const result=await vehicleRepository.findVehiclesByPriceRange(req.body.bottomLimit, req.body.upperLimit);
    res.send(result);
}

const findVehiclesFromUser=async (req, res) => {
    const result=await vehicleRepository.getVehiclesFromUser(req.params.id);
    res.send(result);
}

module.exports={
    getAllVehicles,
    getVehicleByID,
    insertVehicle,
    updateVehicle,
    deleteVehicle,
    findVehiclesByManufactorName,
    findVehiclesByPriceRange,
    findVehiclesFromUser
}