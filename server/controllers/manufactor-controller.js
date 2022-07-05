const manufactorRepository=require("./../repositories/manufactors-repository")

const getAllManufactors=async (req, res) => {
    const results=await manufactorRepository.getAllManufactors();
    res.send(results);
};

const getAllActiveManufactors=async (req, res) => {
    const results=await manufactorRepository.getAllActiveManufactors();
    res.send(results);
};

const getIdByName=async (req, res) => {
    const results=await manufactorRepository.getIdByName(req.params.name);
    res.send(results);
}

module.exports={ getAllManufactors, getAllActiveManufactors, getIdByName }