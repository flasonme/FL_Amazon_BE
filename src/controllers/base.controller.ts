import { Response } from 'express';
import { IQueryOption } from '@/interfaces';

export class BaseController {
    constructor() {

    }
  onError(res: Response, error: Error): Response {
    return res.status(500).json({ message: error.message });
  }

  onSuccess(res: Response, object: any = {}) {
    object = object || {};
    res.status(200).json(object);
  }

  onSuccessPaginate(
    res: Response,
    object: any = {},
    options: IQueryOption = {
      skip: 0,
      limit: 10,
      filter: {},
    },
  ) {
    const page = Math.floor(options.skip / options.limit) + 1;
    res.status(200).json({
      object,
      pagination: { current_page: page, next_page: page + 1, prev_page: page - 1, limit: options.limit },
    });
  }
}
