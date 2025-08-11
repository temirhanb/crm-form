import {useState} from "react";
import {data, DataType} from "@/shared";

export const useNomenclatureModalHook = (
  setGoodsItems,
  handleCancel
) => {
  const [dataSource, setDataSource] = useState(data);
  const [value, setValue] = useState("");

  const handlerAddGoods = (el: DataType) => {
    setGoodsItems((prevItems: DataType[]) => {
      if (prevItems.find(({key}) => key === el.key)) {
        handleCancel();
        return prevItems;
      }
      handleCancel();
      return [...prevItems, el];
    });
  };
  return {dataSource, setDataSource, setValue, value, handlerAddGoods};
};
