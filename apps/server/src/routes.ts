import { query, Router } from "express";
import { DappFileUploadController, DappRegistryController, GhAppController, StoreRegistryController } from "./controllers";
import { body } from "express-validator";
import multer from "multer";

const routes = Router();

// READ
routes.get("/dapp", DappRegistryController.getDapps);
routes.get("/store/featured", StoreRegistryController.getFeaturedDapps);
routes.get("/store/title", StoreRegistryController.getStoreTitle);

// CREATE
routes.post(
  "/dapp",
  body("name").isString().not().isEmpty(),
  body("email").isString().not().isEmpty(),
  body("accessToken").isString().not().isEmpty(),
  body("githubID").isString().not().isEmpty(),
  body("dapp").not().isEmpty(),
  DappRegistryController.addDapp
);

// UPDATE
routes.put(
  "/dapp",
  body("name").isString().not().isEmpty(),
  body("email").isString().not().isEmpty(),
  body("accessToken").isString().not().isEmpty(),
  body("githubID").isString().not().isEmpty(),
  body("dapp").not().isEmpty(),
  DappRegistryController.updateDapp
);

// DELETE
routes.post(
  "/dapp/deleteApp",
  body("name").isString().not().isEmpty(),
  body("email").isString().not().isEmpty(),
  body("accessToken").isString().not().isEmpty(),
  body("githubID").isString().not().isEmpty(),
  body("dappId").isString().not().isEmpty(),
  DappRegistryController.deleteDapp
);

routes.get("/app/:githubID/installed", GhAppController.isAppInstalled);

routes.get("/app/installUrl", GhAppController.getInstallURL);

routes.post(
  "/dapp/:dappId/upload/:field",
  DappFileUploadController.preSignedUrlUpload
);

export default routes;
