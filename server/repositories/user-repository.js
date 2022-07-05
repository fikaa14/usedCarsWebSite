//konekcija na bazu podataka
const dbConnection=require("./../common/db-connection");

const registerUser=async (user) => {

    const [results, metadata]=await dbConnection.query(`INSERT INTO user(first_name, last_name, phone_number, username, password, created_at, updated_at) VALUES(?, ?, ?, ?, ?, now(), now()) `,
        {
            replacements: [user.firstName, user.lastName, user.phoneNumber, user.username, user.password]
        });
    return results;
};

const userExists=async (username) => {

    const [results, metadata]=await dbConnection.query(`SELECT user.id, user.username, user.password FROM user WHERE user.username=?`,
        {
            replacements: [username]
        });
    if (results) return results;

    else return false;
}

const editUser=async (user, id) => {
    const [results, metadata]=await dbConnection.query(
        "UPDATE user SET first_name = ?, last_name = ?, phone_number = ?, updated_at = now() WHERE id = ?",
        {
            replacements: [user.firstName, user.lastName, user.phoneNumber, id]
        });
    return results;
};

const getUser=async (id) => {
    const [results, metadata]=await dbConnection.query(
        "SELECT u.first_name, u.last_name, u.phone_number, u.username FROM User u WHERE u.id = ?",
        {
            replacements: [id]
        }
    );
    return results[0];
}

module.exports={
    registerUser,
    userExists,
    editUser,
    getUser
};