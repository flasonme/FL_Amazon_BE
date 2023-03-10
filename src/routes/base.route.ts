import {Request, Response, Router} from 'express';
import {IQueryOption, IRoute} from '@/interfaces';

export class BaseRouter<T> implements IRoute {
    constructor(controller: T) {
        this.controller = controller;
        this.router = Router();
    }

    public path;
    public router: Router;
    protected controller: T;

    route(fn: (req: Request, res: Response, next: any) => Promise<any>) {
        return (req: Request, res: Response, next: any) =>
            fn
                .bind(this)(req, res, next)
                .catch((error: any) => {
                    this.onError(res, error);
                });
    }

    onError(res: Response, error: Error) {
        res.status(500).json({message: error.message});
    }

    onSuccess(res: Response, object: any = {}, extras: any = {}) {
        object = object || {};
        res.status(200).json({object, ...extras});
    }

    onSuccessPaginate(
        res: Response,
        object: any = {},
        options: IQueryOption = {
            offset: 0,
            limit: 10,
            where: {},
        },
    ) {
        const page = Math.floor(options.offset / options.limit) + 1;
        res.status(200).json({
            object,
            pagination: {current_page: page, next_page: page + 1, prev_page: page - 1, limit: options.limit},
        });
    }
}
