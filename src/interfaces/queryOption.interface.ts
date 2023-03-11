export interface IQueryOption {
  filter?: any;
  limit?: number;
  skip?: number;
  scope?: string[];
  sort?: any[];
  attributes?: any[];
  includes?: any[];
  distinct?: boolean;
  [key: string]: any;
}

export interface ICrudExecOption {
  allowNull?: boolean;
}
