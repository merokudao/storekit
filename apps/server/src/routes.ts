import { Router } from "express";
import { DappFileUploadController, DappRegistryController, GhAppController, StoreRegistryController } from "./controllers";
import { body } from "express-validator";

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

const cpUpload = DappFileUploadController
  .upload
  .fields(
    [
      { name: 'logo', maxCount: 1 },
      { name: 'banner', maxCount: 1 },
      { name: 'screenshots', maxCount: 5},
      { name: 'build', maxCount: 1}
    ]);
routes.post(
  "/dapp/uploadFile",
  body("dappId").isString().not().isEmpty(),
  cpUpload,
  DappFileUploadController.uploadFile
);

export default routes;
