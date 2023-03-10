import * as _ from 'lodash';
import { NextFunction, Response } from 'express';
// import { logger } from '@/utils';
// import * as console from 'console';

export const QueryMiddleware = (req: any, res: Response, next: NextFunction) => {
  // Main Middleware
  const where = _parseWhere(req);
  const order = parseOrder(req);
  const page = parseInt(String(req.query.page || 1));
  const limit = parseInt(String(req.query.limit || 10));
  const offset = parseInt(String(req.query.offset)) || (page - 1) * limit;
  const fields = parseFields(req);

  if (fields.attributes != undefined) {
    fields.attributes = _.union(['id', 'updated_at'], fields.attributes);
  }

  req.queryInfo = _.merge(
    {
      where,
      limit,
      page,
      offset,
      order,
    },
    fields,
  );
  next();
};

const _parseWhere = (req: any): any => {
  let where = req.query['where'];

  try {
    where = JSON.parse(where);
  } catch (ignore) {
    where = undefined;
  }
  return where || {};
};

const parseOrder = (req: any): any => {
  let order = req.query['order'];
  try {
    order = JSON.parse(order);
  } catch (ignore) {
    order = undefined;
  }
  return order || [['updated_at', 'asc']];
};

const parseFields = (req: any): any => {
  let fields = req.query['fields'];
  try {
    fields = JSON.parse(fields);
  } catch (ignore) {
    fields = [];
  }
  try {
    return parseAttributes(fields);
  } catch (err) {
    return null;
  }
};

const parseAttributes = (attrs: any) => {
  const attributes: any[] | any = ['id', 'created_at', 'updated_at'];
  const includes: any[] = [];
  let isGetAll = false;
  let isSetParanoid = false;
  let where: any = undefined;
  _.forEach(attrs, function (f) {
    if (typeof f === 'string') {
      switch (f) {
        case '$all':
          isGetAll = true;
          break;
        case '$paranoid':
          isSetParanoid = true;
          break;
        default:
          attributes.push(f);
      }
    } else if (typeof f === 'object' && !Array.isArray(f)) {
      _.forEach(
        f,
        ((value: any, name: string) => {
          switch (name) {
            case '$where':
              where = _.merge({}, where, value);
              break;
            default:
              includes.push({
                [name]: value,
              });
          }
        }).bind(this),
      );
    }
  });
  const include = parseInclude(includes);
  const result: any = {
    include: include,
    distinct: includes ? true : false,
  };
  if (where) result.where = where;
  if (!isGetAll) {
    result.attributes = attributes;
  }
  if (isSetParanoid) {
    result.paranoid = false;
  }
  if (result.attributes == undefined) {
    result.attributes = { exclude: ['password'] };
  } else {
    result.attributes = result.attributes.filter((e: string) => e !== 'password');
  }
  return result;
};

const parseInclude = (includes: any) => {
  if (includes.length === 0) return includes;

  const associates: any[] = [];
  _.forEach(
    includes,
    ((i: any) => {
      _.forEach(
        i,
        ((attrs: any, name: string) => {
          const associate = Object.assign(
            {
              association: name,
            },
            parseAttributes(attrs),
          );
          associates.push(associate);
        }).bind(this),
      );
    }).bind(this),
  );
  return associates;
};

