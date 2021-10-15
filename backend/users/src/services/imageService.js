const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_BUCKET_REGION, S3_BUCKET_NAME } = require("../config/config");

const s3 = new aws.S3({
  accessKeyId: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY,
  region: S3_BUCKET_REGION,
});

const allowedFileTypes = ['jpeg', 'png'];

const multerFilter =  function (req, file, cb) {
  const ext = file.mimetype.split('/')[1];
 if (allowedFileTypes.includes(ext)) {
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
        cb(null, `image-${userID}.${ext}`);
      },
    }),
    fileFilter: multerFilter,
    limits: {
      // set to 10MB
      fileSize: 1024 * 1024 * 10,
    },
  });

  exports.delete = (imageUrl) => {
    var fileName = imageUrl.split('/').slice(-1)[0];
    var params = {  Bucket: S3_BUCKET_NAME, Key: fileName};
    s3.deleteObject(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully delete profile image from bucket!")
      }
    });
  }