import React from "react";
import {DataType} from "@/shared";
import {TableCell, TableRow} from "@/entities/tableForm";
import {FormInstance} from "antd";

export const EditableContext = React.createContext<FormInstance<any> | null>(null);

export const useTableFormHook = (goodsItems, setGoodsItems, form,
                                 fieldName) => {
  const handleDelete = (key: React.Key) => {
    const newData = goodsItems.filter((item) => item.key !== key);
    setGoodsItems(newData);
  };
  const handleSave = (row: DataType) => {
    const newData: DataType[] = [...goodsItems];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    const price: number = newData[index].price;
    const quantity: number = newData[index].quantity;
    const discounted: number = newData[index].sum_discounted;
    newData[index].paid_rubles = discounted > 0 ? quantity * price - ((quantity * price) / discounted) : quantity * price;
    form.setFieldsValue({[fieldName]: newData});
    setGoodsItems(newData);
  };

  const components = {
    body: {
      row: TableRow,
      cell: TableCell,
    },
  };
  return {
    handleDelete, handleSave, components
  };
};