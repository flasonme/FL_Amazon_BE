import { IQueryOption } from '@/interfaces';
import {ModelType} from "@typegoose/typegoose/lib/types";

export class CRUDService<T extends ModelType<any>> {
  constructor(model: T) {
    this.model = model;
  }

  protected readonly model: ModelType<any>;

  getItem(queryInfo?: IQueryOption) {
    return this.model.findOne(queryInfo);
  }

  async getList(queryInfo?: IQueryOption): Promise<T[]> {
    return this.model.find(queryInfo);
  }

  async create(params: any): Promise<T> {
    return await this.model.create(params);
  }
  async update(id: string, params: any): Promise<any> {
      return this.model.updateOne({_id: id}, params);
  }
  async delete(id: string): Promise<any> {
      return this.model.deleteOne({_id: id})
  }
}
