import {CRUDService} from '@services/crud.service';
import {Request, Response, NextFunction} from 'express';
import {BaseController} from '@controllers/base.controller';

export class CRUDController<T extends CRUDService<any>> extends BaseController {
    public service: T;

    constructor(service: T) {
        super();
        this.service = service;
        console.log("CRUD CONTROLLER: THIS ==> ", service)
    }

    public findMany = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.service.findMany(req.queryInfo);
            this.onSuccessPaginate(res, result, req.queryInfo);

        } catch (error) {
            next(error);
        }
    }

    public async findOne(req: Request, res: Response, next: NextFunction) {
        try {
            req.queryInfo.filter.id = req.params.id;
            const result = await this.service.findOne(req.queryInfo);
            this.onSuccess(res, result);
        } catch (error) {
            next(error);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.create(req.body);
            this.onSuccess(res, result);
        } catch (error) {
            next(error);
        }
    }

    public async update(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.update(req.params.id, req.body);
            this.onSuccess(res, result);
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await this.service.delete(req.params.id);
            this.onSuccess(res, result);
        } catch (error) {
            next(error);
        }
    }
}
