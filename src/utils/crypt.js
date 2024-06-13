var CryptoJS = require("crypto-js");

const encryptRequest = async (data) => {
	// const secret = process.env.REACT_APP_SECRET;

	var ciphertext = CryptoJS.AES.encrypt(
		JSON.stringify(data),
		"secret key 123"
	).toString();
	return ciphertext;
};
const decryptRequest = async (data) => {
	// Decrypt
	var bytes = CryptoJS.AES.decrypt(data, "secret key 123");
	var originalText = bytes.toString(CryptoJS.enc.Utf8);

	return originalText;
};

export { encryptRequest, decryptRequest };
