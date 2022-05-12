
/**
 * Get unique code (will be used as a referral code)
 * @returns {string} uniqueCode
 */
exports.getUniqueCode = () => {
	let uniqueCode = '';
	const charCode = ['A', 'B', 'c', 'Z', '5', 'X', 'K', 'd', '9', 'D'];
	const epocStr = (Date.now()).toString();
	for(let idx =0; idx< epocStr.length; idx++) {
		uniqueCode = uniqueCode + charCode[Number(epocStr[idx])];
	}
    console.log(uniqueCode)
	return uniqueCode;
}

exports.getVerificationCode = (n) => {

	var add = 0, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
    if ( n > max ) {
        return generate(max) + generate(n - max);
    }
    max        = Math.pow(10, n+add);
    var min    = max/10; // Math.pow(10, n) basically
    var number = Math.floor( Math.random() * (max - min + 1) ) + min;
    return ("" + number).substring(add);
}
