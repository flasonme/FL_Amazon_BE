import {CRUDService} from "@/services";
import {PropertyModel} from "@/models";
import {AppException} from '@/common/exceptions';
import {IQueryOption} from "@/interfaces";

export class PropertyService extends CRUDService<typeof PropertyModel> {
    constructor() {
        super(PropertyModel);
    }
    public async findAll(queryOption?: IQueryOption): Promise<any> {
        return this.model.find(queryOption.filter, queryOption.attributes, queryOption);
    }
}
