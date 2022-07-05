
const express=require("express");
const cors=require("cors");


//rutiranje
const authRouting=require("./routing/authentication-routing");
const vehicleRouting=require("./routing/vehicle-routing");
const manufactorRouting=require("./routing/manufactor-routing");

//cookies
const cookieParser=require("cookie-parser");

const app=express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(authRouting);
app.use("/vehicle/", vehicleRouting);
app.use("/manufactor/", manufactorRouting);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(5000, () => {
    console.log("Server is listening at port 5000");
});