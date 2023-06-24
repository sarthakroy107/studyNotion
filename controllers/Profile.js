const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User  = require("../models/User");
const schedule = require('node-schedule');
const cloudinary = require("cloudinary").v2;
exports.createProfile = async (req, res) => {
    try {
        //fetch data
        const {dateOfBirth = "", about = "", phoneNumber = "",gender = ""} = req.body;
        //fetch userID from cookie(req.user)
        const userId = req.user.iq;
        //createProfile
        const newProfile = await Profile.create({
            gender: gender,
            dateOfBirth: dateOfBirth,
            mobileNumber: phoneNumber,
            about: about,
        })
        await User.findByIdAndUpdate(userId.id, {
            profile: newProfile._id,
        })
        //return response
        return res.status(200).json({
            success: true,
            messsage: "Profile created."
        })
    }
    catch(err) {
        return res.status(402).json({
            success: false,
            message: "Profile creation failed"
        })
    }
}

//update profile
exports.updateProfile = async (req, res) => {
    try {
        //fetch data
        const {dateOfBirth = "", about = "", phoneNumber = "",gender = "", profileId} = req.body;
        //update profile
        await Profile.findByIdAndUpdate(userId, {
            gender: gender,
            dateOfBirth: dateOfBirth,
            mobileNumber: phoneNumber,
            about: about,
        });
        return res.status(200).json({
            success: true,
            message: "Profile updated."
        })
    }
    catch(err) {
        return res.status(402).json({
            success: false,
            message: "Profile updation failed"
        })
    }
}

//deleteprofile
exports.deleteProfile = async (req, res) => {
    try{
        //fetch data
        const {profileId} = req.body;
        const userId = req.user.id;
        const deleteProfile = schedule.scheduleJob(new Date(Date.now() + 12 * 60 * 60 * 1000), function(){
            Profile.findByIdAndDelete(profileId);
            User.findByIdAndDelete(userId);
        })
        return req.status(200).json({
            success: true,
            message: "Profile and user wil get deleted after 12h"
        });
    }
    catch(err) {
        return res.status(402).json({
            success: false,
            message: "Profile deletation failed"
        })
    }

}

//get user details
exports.getAllUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;
        const allDetails = await User.findOne(userId).populate("profile").exec();
        return res.status(200).json({
            success: true,
            message: "All profile details fetched",
            data: allDetails
        })
    }
    catch(err) {
        return res.status(200).json({
            success: false,
            message: "Failed to fetch to profile details"
        })
    }
}

//Update profile pic
exports.updateDisplayPicture = async (req, res) => {
    try {
        const userId = req.user.id;
        const newPic = req.files.displayPicture;
        const url = await cloudinary.uploader.upload(newPic, {folder: studyNotion});
        await User.findByIdAndUpdate({_id: userId}, {image: url.secure_url}, {new: true});
        return res.status(200).json({
            success: true,
            message: "Profile picture updated",
            data: url.secure_url
        })
    }
    catch(err) {
        return res.send({
            success: false,
            message: "Profile pic updation failed",
        })
    }
}

//get Enrolled courses
exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const courseDetails = await Course.findOne({_id: userId}).populate("courses").exec();
        if(!courseDetails) {
            return res.status(401).json({
                success: false,
                message: `Could not courses with user ID: ${userId}`,
            })
        }
        return res.status(200).json({
            success: true,
            data: courseDetails.courses
        })
    }catch(err) {
        return res.status(401).json({
            success: false,
            message: "Courses not found"
        })
    }
} 