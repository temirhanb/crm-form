import {Button, Table, TableProps} from "antd";
import {DataType} from "@/shared";
import React from "react";
import {DeleteOutlined} from "@ant-design/icons";
import {TableCell, TableRow} from "@/entities/tableForm";

type TProps = {
  setGoodsItems: (item: DataType[]) => void,
  goodsItems: Array<DataType>
}
type ColumnTypes = Exclude<TableProps<DataType>["columns"], undefined>;

export const TableForm: React.FC<TProps> = ({goodsItems, setGoodsItems}) => {

  const handleDelete = (key: React.Key) => {
    const newData = goodsItems.filter((item) => item.key !== key);
    setGoodsItems(newData);
  };
  const handleSave = (row: DataType) => {
    const newData = [...goodsItems];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setGoodsItems(newData);
  };
  const columns: (ColumnTypes[number] & { dataIndex: string })[] = [
    {
      title: "Название товара",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Сумма",
      responsive: ["md"],
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Скидка",
      responsive: ["lg"],
      dataIndex: "remains",
      key: "remains",
      // handleSave
    },
    {
      title: "Количество",
      responsive: ["lg"],
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Единица",
      responsive: ["lg"],
      dataIndex: "code",
      key: "code",
      // handleSave
    }, {
      title: "Итого",
      responsive: ["lg"],
      dataIndex: "end",
      key: "end",
    },
    {
      title: "Действие",
      dataIndex: "action",
      key: "action",
      render: (el, record) => {
        console.log(record, "record", el);
        return el !== undefined && <Button onClick={() => handleDelete(record.key)}><DeleteOutlined/></Button>;
      },
    },

  ];

  const columnsEdit = columns.map((col) => {

    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const components = {
    body: {
      row: TableRow,
      cell: TableCell,
    },
  };

  return (
    <Table<DataType>
      components={components}
      columns={columnsEdit as ColumnTypes}
      rowClassName={() => "editable-row"}
      dataSource={goodsItems}
    />
  );
};