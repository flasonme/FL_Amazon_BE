import { IQueryOption } from '@/interfaces';
import {ModelType} from "@typegoose/typegoose/lib/types";

export class CRUDService<T extends ModelType<any>> {
  constructor(model: T) {
    this.model = model;
  }

  protected readonly model: ModelType<any>;

  public async findOne(queryOption?: IQueryOption) {
    return this.model.findOne(queryOption.filter, queryOption.attributes, queryOption);
  }

  public async findMany(queryOption?: IQueryOption): Promise<T[]> {
        return this.model.find(queryOption.filter, queryOption.attributes, queryOption);
  }

  public async create(params: any): Promise<T> {
    return await this.model.create(params);
  }
  public async update(id: string, params: any): Promise<any> {
      return this.model.updateOne({_id: id}, params);
  }
  public async delete(id: string): Promise<any> {
      return this.model.deleteOne({_id: id})
  }
}
