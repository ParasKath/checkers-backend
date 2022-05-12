const constant = require(__basePath + 'app/config/constant');
const router = require('express').Router({ caseSensitive: true, strict: true});
const authController = require(constant.path.moduleV1 + '/security/authController');
const authValidations = require(constant.path.moduleV1 + '/security/authValidations');

router.post('/authorize', authValidations.verifyAccessToken , authController.verifyAccessToken );

router.get('/tokenInformation' , authValidations.getUserDetailsFromCookieToken, authController.getUserDetailsFromCookieToken );


module.exports = {
    router : router
}