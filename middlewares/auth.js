const jwt = require("jsonwebtoken");
require("dotenv").config();

//auth
exports.auth = async (req, res, next) => {
    try {
        //extract token
        const token = req.cookie.token || req.body.token || req.header("Authorisation").replace("Bearer ", "");
        //check if token is available or not
        if(!token) {
            return res.status(400).json({
                success: false,
                message: "No coockie"
            })
        }
        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console(`Decoded information from cookie is: ${decode}`);
            req.user = decode;
        }
        catch(err) {
            return res.status(401).json({
                success: false,
                message: "Problem while verifing the token, /auth"
            });
        }
        next();
    }
    catch(err) {
        return res.status(400).json({
            success: false,
            message: "Problem while cookie authentication, /auth"
        })
    }
}

//Student route
exports.isStudent = async (req, res) => {
    try {
        if(req.user.role !== "student") {
            return res.status(400).json({
                success: false,
                message: "This routed is resticed for students"
            })
        }
        next();
    }
    catch{
        return res.status(402).json({
            success: false,
            message: "User role can not be verified"
        })
    }
}

//Educator route
exports.isEducator = async (req, res) => {
    try {
        if(req.user.role !== "educator") {
            return res.status(400).json({
                success: false,
                message: "This routed is resticed for educator"
            })
        }
        next();
    }
    catch{
        return res.status(402).json({
            success: false,
            message: "User role can not be verified"
        })
    }
}

//Admin route
exports.isAdmin = async (req, res) => {
    try {
        if(req.user.role !== "admin") {
            return res.status(400).json({
                success: false,
                message: "This routed is resticed for admin"
            })
        }
        next();
    }
    catch{
        return res.status(402).json({
            success: false,
            message: "User role can not be verified"
        })
    }
}
