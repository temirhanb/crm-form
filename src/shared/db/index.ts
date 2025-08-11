import {DataType} from "csstype";

export interface DataType {
  key: string;
  name: string;
  price?: string | number;
  remains?: string | number;
  code?: string | number | null;
  action?: DataType;
  children?: DataType[];
}

export const data: DataType[] = [
  {
    key: "1",
    name: "Продукты",
    remains: 10,
    code: null,
    children: [
      {
        key: "11",
        name: "Яблоки",
        price: 500,
        remains: 12,
        code: null,
      },
    ]

  },
  {
    key: "2",
    name: "Строй материалы",
    remains: 12,
    code: null,
    children: [
      {
        key: "11",
        name: "Цемент",
        action: {
          price: 5100,
          name: "Цемент",
          key: "22",
          remains: 12,
          code: null,
        },
        price: 5100,
        remains: 12,
        code: null,
      },
    ]
  },
];
