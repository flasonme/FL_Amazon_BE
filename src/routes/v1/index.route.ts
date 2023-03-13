import { Router } from 'express';
import { indexController } from '@/controllers';
import { IRoute } from '@/interfaces';

export class IndexRoute implements IRoute {
  public path = '/';
  public router = Router();
  public indexController = indexController;

  constructor() {
    this.customRouting();
  }

  public customRouting() {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}
