import { check } from "express-validator";

const addPostValidator = () => {
	return [
		check("name").notEmpty().withMessage("Name is a compulsory field"),
		check("topic").notEmpty().withMessage("Topic is a compulsory field"),
		check("title").notEmpty().withMessage("Title is a compulsory field"),
		check("content").notEmpty().withMessage("Content is a compulsory field"),
	];
};

export default { addPostValidator };
