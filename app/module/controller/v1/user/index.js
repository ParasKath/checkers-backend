const constant = require(__basePath + 'app/config/constant');
const router = require('express').Router({ caseSensitive: true, strict: true});
const userController = require(constant.path.moduleV1 + '/user/userController');
const userValidations = require(constant.path.moduleV1 + '/user/userValidations');
const authController = require(constant.path.moduleV1 + '/security/authController');

router.post('/signUp', userValidations.signUpValidation , userController.signUp );

router.post('/login', userValidations.logInValidation , userController.logIn );

router.post('/logout', userValidations.logOutValidation , authController.verifyAccessTokenMiddleware,  userController.logOut );

router.post('/forgotPassword', userValidations.forgotPasswordValidation , userController.forgotPassword );

router.post('/resetPassword', userValidations.resetPasswordValidation , userController.resetPassword );

router.post('/CreateGame',userController.CreateGame)

//authController.verifyAccessTokenMiddleware,
module.exports = {
    router : router
}