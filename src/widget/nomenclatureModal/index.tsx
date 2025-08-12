import React from "react";
import {Button, FormInstance, Input, Modal, Table, TableColumnsType} from "antd";
import {DataType} from "@/shared";
import {useNomenclatureModalHook} from "./hook/useNomenclatureModalHook";
import {apiFetchNomenclature} from "@/shared/api";

interface TProps {
  handleCancel: () => void;
  handleOk: () => void;
  isModalOpen: boolean;
  setGoodsItems: (el: any) => void;
  form: FormInstance<any>;
  fieldName: string;
}

export const NomenclatureModal: React.FC<TProps> = (
  {
    handleCancel,
    isModalOpen,
    handleOk,
    setGoodsItems,
    form,
    fieldName
  }) => {
  const {handlerAddGoods, value, setValue, setDataSource, dataSource} =
    useNomenclatureModalHook(setGoodsItems, handleCancel, form,
      fieldName);

  const columns: TableColumnsType<DataType> = [
    Table.EXPAND_COLUMN,
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Цены",
      dataIndex: "prices",
      key: "prices",
      responsive: ["md"]
    },
    {
      title: "Действие",
      dataIndex: "action",
      key: "action",
      render: (el, record) => {

        return (
          <Button onClick={() => handlerAddGoods(record)} type="primary">
            Выбрать
          </Button>
        );
      },
    },
  ];

  return (
    <Modal
      title="Выбор номенклатуры"
      closable={{"aria-label": "номенклатура"}}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      style={{top: 20}}
    >
      <Input
        placeholder="Найти товар"
        value={value}
        onChange={(e) => {
          const currValue = e.target.value;
          setValue(currValue);

          if (currValue === "") {
            apiFetchNomenclature().then(res => setDataSource(res));
          }
          const filteredData: DataType[] = dataSource.filter((entry) =>
            entry.name.toUpperCase().includes(currValue.toUpperCase())
          );
          setDataSource(filteredData);
        }}
      />
      <Table<DataType>
        style={{marginTop: 10}}
        columns={columns}
        dataSource={dataSource}
      />
    </Modal>
  );
};
