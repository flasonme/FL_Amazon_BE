import { Router } from 'express';
import { IndexController } from '@/controllers';
import { IRoute } from '@/interfaces';

export class IndexRoute implements IRoute {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.customRouting();
  }

  private customRouting() {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}
