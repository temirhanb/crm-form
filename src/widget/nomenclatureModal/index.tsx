import React from "react";
import {Button, Input, Modal, Table, TableColumnsType} from "antd";
import {data, DataType} from "@/shared";
import {useNomenclatureModalHook} from "./hook/useNomenclatureModalHook";

interface TProps {
  handleCancel: () => void;
  handleOk: () => void;
  isModalOpen: boolean;
  setGoodsItems: (el: any) => void;
}

export const NomenclatureModal: React.FC<TProps> = (
  {
    handleCancel,
    isModalOpen,
    handleOk,
    setGoodsItems,
  }) => {
  const {handlerAddGoods, value, setValue, setDataSource, dataSource} =
    useNomenclatureModalHook(setGoodsItems, handleCancel);

  const columns: TableColumnsType<DataType> = [
    Table.EXPAND_COLUMN,
    {
      title: "Наименование",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Цены",
      responsive: ["md"],
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Остатки",
      responsive: ["lg"],
      dataIndex: "remains",
      key: "remains",
    },
    {
      title: "Единица",
      responsive: ["lg"],
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "ШК",
      responsive: ["lg"],
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Действие",
      dataIndex: "action",
      key: "action",
      render: (el, record) => {

        return (
          el !== undefined && (
            <Button onClick={() => handlerAddGoods(record)} type="primary">
              Выбрать
            </Button>
          )
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
          const filteredData = data.filter((entry) =>
            entry.name.includes(currValue)
          );
          setDataSource(filteredData);
        }}
      />
      <Table<DataType> columns={columns} dataSource={dataSource}/>
    </Modal>
  );
};
