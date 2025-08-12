import {useEffect, useState} from "react";
import {DataType} from "@/shared";
import {apiFetchNomenclature} from "@/shared/api";

export const useNomenclatureModalHook = (
  setGoodsItems,
  handleCancel,
  form,
  fieldName
) => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    apiFetchNomenclature().then(res => setDataSource(res));
  }, []);
  const handlerAddGoods = (el: DataType) => {
    setGoodsItems((prevItems: DataType[]) => {
      if (prevItems.find(({key}) => key === el.key)) {
        handleCancel();
        return prevItems;
      }
      handleCancel();
      form.setFieldsValue({[fieldName]: [...prevItems, el]});
      return [...prevItems, el];
    });
  };
  return {dataSource, setDataSource, setValue, value, handlerAddGoods};
};
