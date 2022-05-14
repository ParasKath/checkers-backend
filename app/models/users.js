
const mongoose = require("mongoose");

/**
 * @type {Model}
 */
const userSchema = new mongoose.Schema({
	password: { type: String,trim: true, required:true },
	email: {type: String,trim: true, unique:true },
	sessionToken : { type: String },
	verificationCode : { type: String, default: "" },
	betAmount:{type:Number,required:true},
	gamesPlayed:[{type:String}],
	win:{type:Number},
	lost:{type:Number}
},{timestamps : true});

module.exports = mongoose.model( "users" , userSchema );

