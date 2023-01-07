import { Request, Response } from "express";
import awsS3 from "../utils/s3";

class awsS3Controller {
  constructor() {
    this.uploadFile = this.uploadFile.bind(this);
    this.getFile = this.getFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }

  /**
   * File upload to aws-s3
   */
  uploadFile = async (req: Request, res: Response) => {
    try {
      await awsS3.upload.single("dAppFile");
      return res.status(200).json({ success: true, fileUrl: req.file.path });
    } catch (e) {
      return res.status(400).json({ errors: [{ msg: e.message }] });
    }
  };

  /**
   * Get file from aws-s3 servers
   */
  getFile = async (req: Request, res: Response) => {
    const params = { Bucket: process.env.BUCKET_NAME, Key: req.body.dappId };
    try {
      const response = await awsS3.getFile(params);
      return res.json(response);
    } catch (e) {
      return res.status(400).json({ errors: [{ msg: e.message }] });
    }
  };

  /**
   * Delete file from aws s3 servers
   */
  deleteFile = async (req: Request, res: Response) => {
    const params = { Bucket: process.env.BUCKET_NAME, Key: req.body.dappId };
    try {
      const response = await awsS3.deleteFile(params);
      return res.json(response);
    } catch (e) {
      return res.status(400).json({ errors: [{ msg: e.message }] });
    }
  };
}

export default new awsS3Controller();
