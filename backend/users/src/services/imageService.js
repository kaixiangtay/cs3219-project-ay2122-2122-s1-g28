import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import {
	S3_ACCESS_KEY_ID,
	S3_SECRET_ACCESS_KEY,
	S3_BUCKET_REGION,
	S3_BUCKET_NAME,
} from "../config/config.js";

const s3 = new aws.S3({
	accessKeyId: S3_ACCESS_KEY_ID,
	secretAccessKey: S3_SECRET_ACCESS_KEY,
	region: S3_BUCKET_REGION,
});

const allowedFileTypes = ["jpeg", "jpg", "png"];

const multerFilter = (req, file, cb) => {
	const fileSize = req.headers["content-length"];
	const ext = file.mimetype.split("/")[1];
	const isFileSizeExceed = fileSize > 10000000;
	const isInvalidFileType = !allowedFileTypes.includes(ext);

	if (isFileSizeExceed) {
		cb(new Error("File size exceeded!"), false);
	} else if (isInvalidFileType) {
		cb(new Error("Unrecognised image file type!"), false);
	} else {
		cb(null, true);
	}
};

function uploadImage(bucketName, userID) {
	return multer({
		storage: multerS3({
			s3,
			bucket: bucketName,
			metadata(req, file, cb) {
				cb(null, { fieldName: file.fieldname });
			},
			key(req, file, cb) {
				const ext = file.mimetype.split("/")[1];
				cb(null, `image-${userID}.${ext}`);
			},
		}),
		fileFilter: multerFilter,
	});
}

function deleteImage(imageUrl) {
	const fileName = imageUrl.split("/").slice(-1)[0];
	const params = { Bucket: S3_BUCKET_NAME, Key: fileName };
	s3.deleteObject(params, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log("Successfully delete profile image from bucket!");
		}
	});
}

export { uploadImage, deleteImage };
