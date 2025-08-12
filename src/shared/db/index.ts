import {DataType} from "csstype";

export interface DataType {
  key: string;
  id: number;
  name: string;
  quantity: number;
  price:  number;
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

export const data: DataType[] = [
  {
    key: "1",
    name: "Продукты",
    remains: 12,
    unit: "Кг",
    quantity: 1,
    sum_discounted: 10,
    price: 500,
    paid_rubles: 0,
    children: [
      {
        key: "11",
        name: "Яблоки",
        price: 500,
        remains: 12,
        quantity: 1,
        sum_discounted: 0,
        unit: "Кг",
        paid_rubles: 0,
        action: {
          price: 500,
          name: "Яблоки",
          key: "11",
          remains: 0,
          quantity: 1,
          sum_discounted: 0,
          unit: "Кг",
          paid_rubles: 0
        },
      },
    ]
  },
  {
    key: "2",
    name: "Строй материалы",
    remains: 12,
    unit: "Штука",
    price: 5100,
    quantity: 1,
    sum_discounted: 10,
    paid_rubles: 0,
    children: [
      {
        key: "22",
        name: "Цемент",
        action: {
          price: 5100,
          name: "Цемент",
          key: "22",
          remains: 12,
          quantity: 1,
          sum_discounted: 10,
          paid_rubles: 0,
          unit: "Штука",
        },
        price: 5100,
        paid_rubles: 0,
        remains: 12,
        quantity: 1,
        sum_discounted: 10,
        unit: "Штука",
      },
    ]
  },
];
