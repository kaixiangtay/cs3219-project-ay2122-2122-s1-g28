import { check } from "express-validator";

const addCommentValidator = () => {
	return [
		check("name").notEmpty().withMessage("Name is a compulsory field"),
		check("content").notEmpty().withMessage("Content is a compulsory field"),
	];
};

export default { addCommentValidator };
