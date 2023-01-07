import { Request } from "express";
import multer, { FileFilterCallback, MulterError } from "multer";
import AWS from "aws-sdk";
import multerS3 from "multer-s3";
import Debug from "debug";
const { S3Client } = require("@aws-sdk/client-s3");

const debug = Debug("meroku:server");
const S3 = new AWS.S3();
AWS.config.update({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  maxRetries: 10,
  region: "us-east-2",
});

class awsS3 {
  constructor() {
    this.getFile = this.getFile.bind(this);
    this.getMetaData = this.getMetaData.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }

  /**
   * multerS3 functionality to upload the multipart/formdata format file to aws-s3
   * To know more refer to: https://www.npmjs.com/package/multer-s3
   */
  upload = multer({
    storage: multerS3({
      s3: new S3Client(),
      acl: "public-read",
      bucket: "meroku-uploads-dev",
      metadata: function (
        req: Request,
        file: Express.Multer.File,
        cb: FileFilterCallback
      ) {
        cb(null, Object.assign({}, req.body));
      },
      key: function (
        req: Request,
        file: Express.Multer.File,
        cb: FileFilterCallback
      ) {
        cb(null, req.body.dappId);
      },
    }),
    limits: { fileSize: 1024 * 1024 * 1024 * 10 }, // file upload size limit - 10GB
    fileFilter: function (req: Request, file: Express.Multer.File, cb: any) {
      const filetypes = /apk|zip/; // only .apk & .zip files are allowed
      const mimetype = filetypes.test(file.mimetype);
      if (mimetype) {
        return cb(null, true);
      } else {
        cb("Error: Allowed file extensions - apk | zip !");
      }
    },
  });

  /**
   * To get the .apk to download by any user
   * @param params eg: { Bucket: "bucketName", Key: "objectKey",}
   */
  getFile = async (params: AWS.S3.GetObjectRequest) => {
    try {
      await S3.getObject(params).promise();
    } catch (e) {
      debug(e.message);
    }
  };

  /**
   * To get the metadata of a dappId without loading the file
   * @param s3Data eg: { Bucket: "bucketName", Key: "objectKey", ACL: "public-read",
                    Body: JSON.stringify(dataObject), ContentType: "application/json", 
                    Metadata: { email: "sample@gmail.com", dappId: "300",}, 
                } 
   */
  getMetaData = async (s3Data: AWS.S3.HeadObjectRequest) => {
    try {
      await S3.headObject(s3Data).promise();
    } catch (e) {
      debug(e.message);
    }
  };

  /**
   * To delete the file from s3
   * @param params eg: { Bucket: "bucketName", Key: "objectKey",}
   */
  deleteFile = async (params: AWS.S3.DeleteObjectRequest) => {
    try {
      await S3.deleteObject(params).promise();
    } catch (e) {
      debug(e.message);
    }
  };
}

export default new awsS3();
