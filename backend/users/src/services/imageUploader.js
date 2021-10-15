const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_REGION } = require("../config/config");

const s3 = new aws.S3({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  region: S3_BUCKET_REGION,
});

const multerFilter =  function (req, file, cb) {
  const ext = file.mimetype.split('/')[1];
 if (ext === 'jpeg' || ext === 'png') {
   cb(null, true);
 } else {
   cb(new Error("Unrecognised image file type!"), false);
 }
}

exports.upload = (bucketName, userID) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1];
        console.log(userID);
        cb(null, `image-${userID}.${ext}`);
      },
    }),
    fileFilter: multerFilter,
    limits: {
      // set to 10MB
      fileSize: 1024 * 1024 * 10,
    },
  });