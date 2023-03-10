import { CRUDService } from '@services/crud.service';
import { Request, Response, NextFunction } from 'express';
import { BaseController } from '@controllers/base.controller';

export class CRUDController<T extends CRUDService<any>> extends BaseController {
  protected readonly service: T;

  constructor(service: T) {
    super();
    this.service = service;
  }

  public getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.service.getList(req.queryInfo);
      this.onSuccessPaginate(res, result);
    } catch (error) {
      this.onError(res, error);
      next(error);
    }
  };

  public async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      req.queryInfo.filter.id = req.params.id;
      const result = await this.service.getItem(req.queryInfo);
      this.onSuccess(res, result);
    } catch (error) {
      // this.onError(res, error);
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.create(req.body);
      this.onSuccess(res, result);
    } catch (error) {
      // this.onError(res, error);
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.update(req.params.id ,req.body);
      this.onSuccess(res, result);
    } catch (error) {
      // this.onError(res, error);
      next(error);
    }
  }
}
