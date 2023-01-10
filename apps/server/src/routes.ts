import { Router } from "express";
import { body } from "express-validator";
import DappRegistoryController from "./controllers/dappRegistoryController";
import StoreRegistoryController from "./controllers/storeRegistoryController";
import DappFileUploadController from "./controllers/dappFileUploadController";
import dappFileUploadController from "./controllers/dappFileUploadController";
import upload from "./utils/formdata";

const routes = Router();

// READ
routes.get("/dapp", DappRegistoryController.getDapps);
routes.get("/store/featured", StoreRegistoryController.getFeaturedDapps);
routes.get("/store/title", StoreRegistoryController.getStoreTitle);
routes.get("/dapp/presignedurl", DappFileUploadController.getPreSignedUrl);

// CREATE
routes.post(
  "/dapp",
  body("name").isString().not().isEmpty(),
  body("email").isString().not().isEmpty(),
  body("accessToken").isString().not().isEmpty(),
  body("githubID").isString().not().isEmpty(),
  body("dapp").not().isEmpty(),
  DappRegistoryController.addDapp
);
routes.post(
  "/dapp/uploadFile",
  upload.single("dAppFile"),
  body("dappId").isString().not().isEmpty(),
  DappFileUploadController.upload.single("dAppFile"),
  dappFileUploadController.uploadFile
);

// UPDATE
routes.put(
  "/dapp",
  body("name").isString().not().isEmpty(),
  body("email").isString().not().isEmpty(),
  body("accessToken").isString().not().isEmpty(),
  body("githubID").isString().not().isEmpty(),
  body("dapp").not().isEmpty(),
  DappRegistoryController.updateDapp
);
routes.put(
  "/dapp/updateFile",
  upload.single("dAppFile"),
  body("dappId").isString().not().isEmpty(),
  DappFileUploadController.updateFile
);

// DELETE
routes.post(
  "/dapp/deleteApp",
  body("name").isString().not().isEmpty(),
  body("email").isString().not().isEmpty(),
  body("accessToken").isString().not().isEmpty(),
  body("githubID").isString().not().isEmpty(),
  body("dappId").isString().not().isEmpty(),
  DappRegistoryController.deleteDapp
);
routes.post(
  "/dapp/deleteFile",
  body("dappId").isString().not().isEmpty(),
  DappFileUploadController.deleteFile
);

export default routes;
