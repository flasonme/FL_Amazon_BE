import { NextFunction, Request, Response } from 'express';
import {BaseController} from "@controllers/base.controller";

export class IndexController extends BaseController {
    constructor() {
        super();
    }
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };
}
