import generator from "generate-password";
import User from "../models/userModel";
import userAuth from "../middlewares/userAuth";
import mailerService from "./mailerService";
import imageService from "./imageService";

async function getAllUsers() {
	const users = await User.find();
	return users;
}

async function getUserByEmail(inputEmail) {
	const user = await User.findOne({ email: inputEmail });
	return user;
}

async function getUserByToken(inputToken) {
	const user = await User.findOne({ token: inputToken });
	return user;
}

async function getUserByID(userId) {
	const user = await User.findById(userId);
	return user;
}

function createUser(inputData) {
	const user = new User();
	user.name = inputData.name;
	user.email = inputData.email;
	user.password = userAuth.hashPassword(inputData.password);
	user.token = userAuth.createSignUpToken(user.email);

	user.save();
	mailerService.sendRegisterUserEmail(user.email, user.token);
	return user;
}

async function updateUser(userId, inputData) {
	const user = await getUserByID(userId);
	user.name = inputData.name;

	if (inputData.password !== undefined) {
		user.password = userAuth.hashPassword(inputData.password);
	}
	user.save();
	return user;
}

function verifyUser(user) {
	user.isVerified = true;
	user.save();
	return user;
}

function saveProfileImageUrl(user, imageLink) {
	user.profileImageUrl = imageLink;
	user.save();
	return user;
}

function logoutUser(user) {
	user.token = "";
	user.save();
}

async function deleteUser(userId) {
	const user = await getUserByID(userId);
	if (user.profileImageUrl !== "") {
		imageService.deleteImage(user.profileImageUrl);
	}
	const status = await User.deleteOne(user);
	return status.deletedCount;
}

function resetPassword(user) {
	const tempPassword = generator.generate({
		length: 15,
		numbers: true,
		symbols: true,
		strict: true,
	});

	// temporary password will be issued
	mailerService.sendForgotPasswordEmail(user.email, tempPassword);
	user.token = userAuth.createSignUpToken(user.email);
	user.password = userAuth.hashPassword(tempPassword);
	user.save();
}

function resendEmail(user) {
	user.token = userAuth.createSignUpToken(user.email);
	user.save();
	mailerService.sendRegisterUserEmail(user.email, user.token);
}

function loginUser(user) {
	// Allow token access for a day
	user.token = userAuth.createLoginToken(user._id);
	user.save();
	return user;
}

module.exports = {
	getAllUsers,
	getUserByEmail,
	getUserByToken,
	getUserByID,
	createUser,
	updateUser,
	verifyUser,
	saveProfileImageUrl,
	logoutUser,
	deleteUser,
	resetPassword,
	resendEmail,
	loginUser,
};
