import { CRUDController } from '@controllers/crud.controller';
import { Router } from 'express';
// import { QueryMiddleware } from '@/middlewares';
import { IRoute } from '@/interfaces';

export class CRUDRouter<T extends CRUDController<any>> implements IRoute {
  constructor(controller: T) {
    this.controller = controller;
    this.router = Router();
    this.baseRouting();
  }

  public path;
  public controller: T;
  public router: Router;

  public baseRouting() {
    // Custom
  }
}
