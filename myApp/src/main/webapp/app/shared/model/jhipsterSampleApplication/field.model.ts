import { ITable } from 'app/shared/model/jhipsterSampleApplication/table.model';

export interface IField {
  id?: number;
  name?: string;
  table?: ITable;
}

export const defaultValue: Readonly<IField> = {};
