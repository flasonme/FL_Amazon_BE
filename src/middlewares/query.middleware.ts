import * as _ from 'lodash';
import {NextFunction, Response} from 'express';

export const QueryMiddleware = (req: any, res: Response, next: NextFunction) => {
    const filter = _parseWhere(req);
    const sort = parseOrder(req);
    const page = parseInt(String(req.query.page || 1));
    const limit = parseInt(String(req.query.limit || 10));
    const skip = parseInt(String(req.query.skip)) || (page - 1) * limit;
    const fields = parseFields(req);

    if (fields.attributes != undefined) {
        fields.attributes = fields.attributes;
    }

    req.queryInfo = _.merge(
        {
            filter,
            limit,
            skip,
            sort,
        },
        fields,
    );
    next();
};

const _parseWhere = (req: any): any => {
    let filter: string;
    try {
        filter = JSON.parse(require('url').parse(req.url, true).query['filter'])
    } catch (ignore) {
        filter = undefined;
    }
    return filter || {};
};

const parseOrder = (req: any): any => {
    let sort: string;
    try {
        sort = JSON.parse(require('url').parse(req.url, true).query['sort']);
    } catch (ignore) {
        sort = undefined;
    }
    return sort || {updatedAt: 'asc'};
};

const parseFields = (req: any): any => {
    let fields;
    try {
        fields = JSON.parse(require('url').parse(req.url, true).query['fields']);
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
    const attributes: any[] = [];
    const populate: any[] = [];
    let isGetAll = false;
    let isSetParanoid = false;
    let filter: any = undefined;
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
                        case '$filter':
                            filter = _.merge({}, filter, value);
                            break;
                        default:
                            populate.push({
                                path: name,
                                ...parseAttributes(value),
                            });
                    }
                }).bind(this),
            );
        }
    });
    const result: any = {
        populate,
        distinct: populate.length ? true : false,
    };
    if (filter) result.filter = filter;
    if (!isGetAll) {
        result.attributes = ['_id', 'updatedAt'];
    }
    if (isSetParanoid) {
        result.paranoid = false;
    }
    // if (result.attributes == undefined) {
    //     result.attributes = {password: 0};
    // } else {
    //     result.attributes = result.attributes.reduce((acc: any, curr: string) => {
    //         if (curr !== 'password') {
    //             acc[curr] = 1;
    //         }
    //         return acc;
    //     }, {});
    // }
    return result;
};
