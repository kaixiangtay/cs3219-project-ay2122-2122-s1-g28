import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		unique: true,
	},
	password: {
		type: String,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	profileImageUrl: {
		type: String,
		default: "",
	},
	token: {
		type: String,
	},
	dateCreated: {
		type: Date,
		default: Date.now(),
	},
});

const User = mongoose.model("User", UserSchema);

export default User;
