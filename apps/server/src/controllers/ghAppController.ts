import { DappStoreRegistry } from "@merokudao/dapp-store-registry";
import { Request, Response } from "express";
import Debug from "debug";

const debug = Debug("meroku:ghAppController")

const registry = new DappStoreRegistry();

class GhApp {

  constructor() {
    this.isAppInstalled = this.isAppInstalled.bind(this);
    this.getInstallURL = this.getInstallURL.bind(this);
  }

  isAppInstalled = async (req: Request, res: Response) => {
    const ghID = req.params.githubID as string;

    await registry.init();
    const isInstalled = await registry.isGHAppInstalled(ghID);
    return res.json({ isInstalled: isInstalled });
  }

  getInstallURL = async (req: Request, res: Response) => {
    await registry.init();
    const url = await registry.ghAppInstallURL();
    return res.json({ url: url });
  }
}

export const GhAppController = new GhApp();
