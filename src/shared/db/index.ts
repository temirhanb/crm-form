import {DataType} from "csstype";

export interface DataType {
  key: string;
  id: number;
  name: string;
  quantity: number;
  price:  number;
  prices:  number;
  remains?: string | number;
  sum_discounted:  number;
  unit?: string;
  unit_name?:string;
  discount?:number;
  nomenclature?:number;
  action?: DataType;
  children?: DataType[];
  paid_rubles: number;
}