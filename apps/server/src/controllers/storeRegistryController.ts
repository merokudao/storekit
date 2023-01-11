import { Request, Response } from "express";
import { DappStoreRegistry } from "@merokudao/dapp-store-registry";

const DappStore = new DappStoreRegistry();

class StoreRegistry {
  constructor() {
    this.getStoreTitle = this.getStoreTitle.bind(this);
    this.getFeaturedDapps = this.getFeaturedDapps.bind(this);
  }

  getStoreTitle = async (req: Request, res: Response) => {
    try {
      await DappStore.init();
      const response = DappStore.getRegistryTitle();
      return res.json(response);
    } catch (e) {
      return res.status(400).json({ errors: [{ msg: e.message }] })
    }
  };

  getFeaturedDapps = async (req: Request, res: Response) => {
    try {
      await DappStore.init();
      const response = DappStore.getFeaturedDapps();
      return res.json(response);
    } catch (e) {
      return res.status(400).json({ errors: [{ msg: e.message }] })
    }
  };
}

export const StoreRegistryController = new StoreRegistry();
