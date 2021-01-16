import { IField } from 'app/shared/model/jhipsterSampleApplication/field.model';

export interface ITable {
  id?: number;
  name?: string;
  age?: number;
  fieldLists?: IField[];
}

export const defaultValue: Readonly<ITable> = {};
