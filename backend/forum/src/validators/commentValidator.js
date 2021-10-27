import { check } from "express-validator";

const addCommentValidator = () => {
	return [
		check("userName").notEmpty().withMessage("Name is a compulsory field"),
		check("content").notEmpty().withMessage("Content is a compulsory field"),
	];
};

module.exports = { addCommentValidator };
