const dbConnection=require("./../common/db-connection");

const getAllVehicles=async () => {
    const [results, metadata]=await dbConnection.query("SELECT v.*, m.name as manufactor_name FROM vehicle v, manufactor m WHERE v.manufactor_id = m.id");
    return results;
};

const getVehicleByID=async (id) => {
    const [results, metadata]=await dbConnection.query(
        "SELECT v.*, u.* , m.name FROM vehicle v, user u, manufactor m WHERE v.id = ? AND v.user_id = u.id AND v.manufactor_id = m.id",
        {
            replacements: [id]
        });
    return results[0];
}

const insertVehicle=async (vehicle) => {
    const [results, metadata]=await dbConnection.query(`INSERT INTO vehicle(car_body, horse_power, engine, price, mileage, transmission, production_year, description, user_id, manufactor_id, img_path, updated_at, created_at) 
                                                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, now(), now())`,
        {
            replacements: [vehicle.carBody, vehicle.horsePower, vehicle.engine,
            vehicle.price, vehicle.mileage, vehicle.transmission, vehicle.productionYear,
            vehicle.description, vehicle.user_id, vehicle.manufactor_id, vehicle.imgPath]
        });
    return results;
}

const updateVehicle=async (vehicle, id) => {
    const [results, metadata]=await dbConnection.query(
        `UPDATE vehicle SET car_body=?, horse_power=?, engine=?, price=?, mileage=?, production_year=?, description=?, updated_at=now() WHERE id=?`,
        {
            replacements: [vehicle.carBody, vehicle.horsePower, vehicle.engine,
            vehicle.price, vehicle.mileage, vehicle.productionYear,
            vehicle.description, id]
        });
    return results;
}


const deleteVehicle=async (id) => {
    const [results, metadata]=await dbConnection.query("DELETE FROM vehicle WHERE id = ?",
        {
            replacements: [
                id
            ]
        });
    return results;
}

const findVehiclesByManufactorName=async (name) => {
    const [results, metadata]=await dbConnection.query(
        "SELECT vehicle.*, manufactor.name as manufactor_name FROM vehicle, manufactor WHERE vehicle.manufactor_id = manufactor.id AND manufactor.name = ?",
        {
            replacements: [name]
        }
    );
    return results;
}

const findVehiclesByPriceRange=async (bottomLimit, upperLimit) => {
    if (upperLimit==undefined||upperLimit=="") upperLimit='999999999';
    if (bottomLimit==undefined||bottomLimit=="") bottomLimit='0';
    const [results, metadata]=await dbConnection.query(
        "SELECT v.*, m.name as manufactor_name FROM vehicle v, manufactor m WHERE v.manufactor_id = m.id AND v.price BETWEEN ? AND ?",
        {
            replacements: [bottomLimit, upperLimit]
        }
    );
    return results;
}

const getVehiclesFromUser=async (id) => {
    const [results, metadata]=await dbConnection.query(
        "SELECT v.*, m.name as manufactor_name FROM vehicle v, user u, manufactor m WHERE v.user_id = u.id AND u.id = ? AND v.manufactor_id = m.id",
        {
            replacements: [id]
        }
    );
    return results;
}

module.exports={
    getAllVehicles,
    getVehicleByID,
    insertVehicle,
    updateVehicle,
    deleteVehicle,
    findVehiclesByManufactorName,
    findVehiclesByPriceRange,
    getVehiclesFromUser
}