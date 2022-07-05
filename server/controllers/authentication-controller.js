
//user repositor
const userRepository=require("./../repositories/user-repository");

//Kriptovanje sifri
const bcrypt=require("bcrypt");

const { validateToken }=require("./../JWT");
const { createTokens }=require("./../JWT");

const login=async (req, res) => {
    const { username, password }=req.body;
    const user=await userRepository.userExists(username);
    if (user) {
        const dbPassword=user[0].password;
        bcrypt.compare(password, dbPassword, (error, match) => {
            if (error) {
                console.log(error);
            }
            if (match) {

                const userId=user.id;
                const accessToken=createTokens(user);
                res.cookie("access-token", accessToken, {
                    maxAge: 1296000000
                });
                res.cookie("user-id", user[0].id, { maxAge: 1296000000 })

                res.status(201).json({ accessToken, user_id: user[0].id });
            } else {
                res
                    .status(400)
                    .json({ error: "Wrong Username and Password Combination!" })
            }
        })
    }
    else {
        res.status(400).json({ error: "User with that username does not exists" });
    }
};

const register=async (req, res) => {
    const { firstName, lastName, phoneNumber, username, password }=req.body;
    bcrypt.hash(password, 10).then(async (hash) => {
        try {
            const result=await userRepository.registerUser({
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                username: username,
                password: hash
            });

            res.send("USER REGISTERED")
        }
        catch (err) {
            res.status(400).json({ error: err });
        }
    });
};

const profile=async (req, res) => {
    const result=await userRepository.getUser(req.params.id);
    res.send(result);
}

const editUser=async (req, res) => {
    const { firstName, lastName, phoneNumber }=req.body;
    const id=req.params.id;
    const results=await userRepository.editUser({
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
    }, id);
    res.send(results);
}

const userExists=async (req, res) => {
    const username=req.params.username;
    const results=await userRepository.userExists(username);
    if (results[0]) {
        res.send({ "usernameExists": true });
    }
    else {
        res.send({ "usernameExists": false });
    }

}

module.exports={ login, register, profile, editUser, userExists }