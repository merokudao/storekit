import AWS from "aws-sdk";
import Debug from "debug";

const debug = Debug("meroku:server");
const endpoint = new AWS.Endpoint(process.env.S3_ENDPOINT);
const S3 = new AWS.S3({
  endpoint: endpoint,
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  maxRetries: 10,
});

class awsS3 {
  constructor() {
    this.uploadFile = this.uploadFile.bind(this);
    this.getFile = this.getFile.bind(this);
    this.getMetaData = this.getMetaData.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }

  /**
   * To upload a .apk format to s3  
   * @param S3Data eg: { Bucket: "bucketName", Key: "objectKey", ACL: "public-read",
                    Body: JSON.stringify(dataObject), ContentType: "application/json", 
                    Metadata: { email: "sample@gmail.com", dappId: "300",}, 
                } 
   * @returns 
   */
  uploadFile = async (S3Data: AWS.S3.PutObjectRequest) => {
    const params = {
      Bucket: S3Data.Bucket,
      Key: S3Data.Key, // DappId is the unique identifier we want to use as key in S3
      Body: S3Data.Body,
      Metadata: S3Data.Metadata,
    };
    try {
      await S3.upload(params).promise();
    } catch (e) {
      debug(e.message);
    }
  };

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
