import { Router } from 'express';
import DappRegistoryController from './controllers/dappRegistoryController';
import StoreRegistoryController from './controllers/storeRegistoryController';

const routes = Router();

// READ
routes.get('/dapp', DappRegistoryController.getDapps);
routes.get('/dapp/featured', StoreRegistoryController.getFeaturedDapps);
routes.get('/dapp/title', StoreRegistoryController.getStoreTitle);

// CREATE
routes.post('/dapp', DappRegistoryController.addDapp);

// UPDATE
routes.put('/dapp', DappRegistoryController.updateDapp);

// DELETE
routes.delete('/dapp/{dappId}', DappRegistoryController.deleteDapp);

export default routes;