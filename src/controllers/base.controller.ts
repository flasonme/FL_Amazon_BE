import { Response } from 'express';
import { IQueryOption } from '@/interfaces';

export class BaseController {
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
      offset: 0,
      limit: 10,
      where: {},
    },
  ) {
    const page = Math.floor(options.offset / options.limit) + 1;
    res.status(200).json({
      object,
      pagination: { current_page: page, next_page: page + 1, prev_page: page - 1, limit: options.limit },
    });
  }
}
