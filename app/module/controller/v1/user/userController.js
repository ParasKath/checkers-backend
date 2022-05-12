const underscore = require("underscore");
const util = require("util");
const user = require(".");
const fs = require('fs')
const _ = require("lodash")
const constant = require(__basePath + 'app/config/constant');
const response = require(constant.path.app + 'util/response');
const { writeLogInfo, writeLogErrorTrace } = require(constant.path.app + 'util/logger');
const { hash, validateHash } = require(constant.path.app + 'util/password');
const jwt            = require(constant.path.app + 'core/jwt');
const { getUniqueCode , getVerificationCode } = require(constant.path.app + 'util/utility');
const UserModel = require(constant.path.app + 'models/users');
const { sendEmail } = require( constant.path.app + 'util/sendGrid')
const generateUniqueId = require('generate-unique-id');



exports.signUp = async function( req, res, next ) {
    try {
        requestBody = req.body

        userObject = {}
        userObject['email'] = requestBody['email']
        userObject['betAmount']= constant.initialBetAmount;

        writeLogInfo(['[signup]', '[controller] called for: ', userObject ]);

        req.body.password = hash(req.body.password);
        
        let ifAlreadyExists = await UserModel.findOne({ "email" : requestBody['email']})
        if ( ifAlreadyExists ) {
            return res.status(200).json(response.build("EMAIL_ALREADY_EXISTS", { result: null } ));
        }

        let userDoc = await UserModel.create( { ...userObject, "password" : req.body.password} );

        return res.status(200).json(response.build('SUCCESS', userDoc ));
    
    } catch (error) {
        writeLogErrorTrace(['[signup]', '[controller] Error: ', error]);
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
    }

}


exports.logIn = async( req, res, next ) => {
    try {
        requestBody  = req.body
        writeLogInfo(['[login]', '[controller] called : ' , requestBody['email']]);
        let userData = await UserModel.findOne({ "email" : requestBody['email']})
        
        if( !userData) {
            return res.status(500).json(response.build('ERROR_USER_NOT_EXISTS', {}))
        }    

        if(!validateHash( userData.password, requestBody.password)) {
            return res.status(500).json(response.build('ERROR_INVALID_PASSWORD', {}));
        }

        const data = underscore.pick(userData , '_id', 'email' );
        data['sessionToken'] = getUniqueCode()
        const token = await new jwt().sign(data, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRY
        });
        
        await UserModel.update( { "_id" : userData['_id']}, { "sessionToken" : data['sessionToken']})

        writeLogInfo(['[login]', '[controller] response body: ', data]);
        data.token = token;
        res.cookie('token',data['token'],{ maxAge: 900000, httpOnly: true});
        return res.status(200).json(response.build("SUCCESS", { result: { "email" : data["email"], "token" : data["token"] } } ));

    }
    catch(error) {
        writeLogErrorTrace(['[login]', '[controller] Error: ', error]);
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
    }
}


exports.logOut = async( req, res, next ) => {
    try {

        requestBody  = req.body
        writeLogInfo(['[logout]', '[controller] called : ' , requestBody ]);

        let data = await UserModel.update( { "_id" : requestBody['userId']}, { "sessionToken" : "" } )

        writeLogInfo(['[logout]', '[controller] response body: ', data ]);

        return res.status(200).json(response.build("SUCCESS", { result: "Logged Out Successfully." } ));

    }
    catch(error) {
        writeLogErrorTrace(['[logout]', '[controller] Error: ', error]);
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
    }
}

exports.forgotPassword = async( req, res, next ) => {
    try {

        let readFile

        requestBody  = req.body
        writeLogInfo(['[forgotPassword]', '[controller] called : ' , requestBody ]);

        let userData = await UserModel.findOne({ "email" : requestBody['email']})
        
        if( !userData) {
            return res.status(500).json(response.build('ERROR_USER_NOT_EXISTS', {}))
        } 

        const verificationCode = getVerificationCode(constant.verificationCodeLimit);

        emailFormat = constant.emailFormat.forgotPassword;
        readFile =  util.promisify(fs.readFile)
        emailTemplate  = await readFile(emailFormat.html)
        html = _.replace(emailTemplate, '${{link}}', `${process.env.ADMIN_RESET_PASSWORD_LINK}?email=${userData['email']}&verificationCode=${verificationCode}`);

        const result = await sendEmail(
            requestBody['email'],
            emailFormat.subject,
            html
        );

        if( result && result["sent"] == false ) {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', { error : "Email server down." } ))
        }

        let data = await UserModel.update( { "email" : requestBody['email']}, { "verificationCode" : verificationCode } )

        let otpValidTime = constant.otpValidTime
        
        setTimeout(async() => {
            await UserModel.update( { "email" : requestBody['email']}, { "verificationCode" : "" } )
        }, otpValidTime)

        resultMessage = constant.messages.linkSentToResetPassword

        writeLogInfo(['[forgotPassword]', '[controller] response body: ', resultMessage ]);

        return res.status(200).json(response.build("SUCCESS", { result: resultMessage } ));;
    }
    catch(error) {
        writeLogErrorTrace(['[forgotPassword]', '[controller] Error: ', error]);
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
    }
}


exports.resetPassword = async( req, res, next ) => {
    try {

        requestBody  = req.body
        writeLogInfo(['[resetPassword]', '[controller] called : ' , req.body['verificationCode'] ]);

        let userData = await UserModel.findOne({ "verificationCode" : requestBody['verificationCode']})
        
        if( !userData) {
            return res.status(500).json(response.build('ERROR_USER_NOT_EXISTS', {}))
        } 

        requestBody['password'] = hash(requestBody['password']);

        await UserModel.update( {  "verificationCode" : requestBody['verificationCode'] }, { "verificationCode" : "" , "password" : requestBody['password'] } )
        
        resultMessage = constant.messages.linkSentToResetPassword

        writeLogInfo(['[resetPassword]', '[controller] response body: ', resultMessage ]);

        return res.status(200).json(response.build("SUCCESS", { result: resultMessage } ));
    }
    catch(error) {
        writeLogErrorTrace(['[resetPassword]', '[controller] Error: ', error]);
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
    }
}

exports.CreateGame = async(req,res,next)=>
{
    try
    {
        let requestBody= req.body;
        const gamecode = generateUniqueId({
            length: 15,
            useLetters: true,
            useNumbers:true
          });

          console.log(requestBody);

        //let userData = await UserModel.findOne({ "" : requestBody['email']})  
        
        emailFormat = constant.emailFormat.CreatGame;
        readFile =  util.promisify(fs.readFile)
        emailTemplate  = await readFile(emailFormat.html)
        html = _.replace(emailTemplate, '${{link}}', `${gamecode}`);

        const result = await sendEmail(
            requestBody['email'],
            emailFormat.subject,
            html
        );

        if( result && result["sent"] == false ) {
            return res.status(500).json(response.build('ERROR_SERVER_ERROR', { error : "Email server down." } ))
        }

        return res.status(200).json(response.build("SUCCESS", { gamecode: gamecode } ));;

    }
    catch(error)
    {
        writeLogErrorTrace(['[resetPassword]', '[controller] Error: ', error]);
        return res.status(500).json(response.build('ERROR_SERVER_ERROR', {error: error}));
    }
}


