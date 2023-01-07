import { Router } from "express";
import DappRegistoryController from "./controllers/dappRegistoryController";
import StoreRegistoryController from "./controllers/storeRegistoryController";
import DappFileUploadController from "./controllers/dappFileUploadController";
import { body } from "express-validator";

const routes = Router();

// READ
routes.get("/dapp", DappRegistoryController.getDapps);
routes.get("/store/featured", StoreRegistoryController.getFeaturedDapps);
routes.get("/store/title", StoreRegistoryController.getStoreTitle);
routes.get("/dapp/s3", DappFileUploadController.getFile);

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
  "/dapp/s3/upload",
  body("dappId").isString().not().isEmpty(),
  DappFileUploadController.uploadFile
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
  "/dapp/s3/delete",
  body("dappId").isString().not().isEmpty(),
  DappFileUploadController.deleteFile
);

export default routes;
