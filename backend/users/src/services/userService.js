import generator from "generate-password";
import User from "../models/userModel.js";
import userAuth from "../middlewares/userAuth.js";
import mailerService from "./mailerService.js";
import { deleteImage } from "./imageService.js";

async function getAllUsers() {
	const users = await User.find();
	return users;
}

async function getUserByEmail(inputEmail) {
	const user = await User.findOne({ email: inputEmail });
	return user;
}

async function getUserByID(userId) {
	const user = await User.findById(userId);
	return user;
}

async function createUser(inputData) {
	const user = new User();
	user.name = inputData.name;
	user.email = inputData.email;
	user.password = userAuth.hashPassword(inputData.password);
	user.token = userAuth.createSignUpToken(user.email);

	await user.save();
	await mailerService.sendRegisterUserEmail(user.email, user.token);
	return user;
}

async function updateUser(userId, inputData) {
	const user = await getUserByID(userId);
	user.name = inputData.name;

	if (inputData.password !== undefined) {
		user.password = userAuth.hashPassword(inputData.password);
	}
	await user.save();
	return user;
}

async function verifyUser(user) {
	user.isVerified = true;
	await user.save();
	return user;
}

async function saveProfileImageUrl(user, imageLink) {
	user.profileImageUrl = imageLink;
	await user.save();
	return user;
}

async function logoutUser(user) {
	user.token = "";
	await user.save();
}

async function deleteUser(userId) {
	const user = await getUserByID(userId);
	if (user.profileImageUrl !== "") {
		deleteImage(user.profileImageUrl);
	}
	const status = await User.deleteOne(user);
	return status.deletedCount;
}

async function resetPassword(user) {
	const tempPassword = generator.generate({
		length: 15,
		numbers: true,
		symbols: true,
		strict: true,
	});

	user.token = userAuth.createSignUpToken(user.email);
	user.password = userAuth.hashPassword(tempPassword);
	await user.save();
	// temporary password will be issued
	await mailerService.sendForgotPasswordEmail(user.email, tempPassword);
}

async function resendEmail(user) {
	user.token = userAuth.createSignUpToken(user.email);
	await user.save();
	await mailerService.sendRegisterUserEmail(user.email, user.token);
}

async function loginUser(user) {
	// Allow token access for a day
	user.token = userAuth.createLoginToken(user._id);
	await user.save();
	return user;
}

export default {
	getAllUsers,
	getUserByEmail,
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
