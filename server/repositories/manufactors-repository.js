const dbConnection = require("./../common/db-connection");

const getAllManufactors = async () => {
    const [results, metadata] = await dbConnection.query("SELECT name FROM manufactor");
    return results;
};

const getAllActiveManufactors = async () => {
    const [results, metadata] = await dbConnection.query("SELECT m.name FROM manufactor m, vehicle v WHERE v.manufactor_id = m.id");
    return results;
};

const getIdByName = async (name) => {
    const [results, metadata] = await dbConnection.query(
        "SELECT id FROM manufactor WHERE manufactor.name = ?", 
        {
            replacements: [ name ]
        });
    return results;
}



module.exports = { getAllManufactors, getAllActiveManufactors, getIdByName}