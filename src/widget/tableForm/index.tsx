import {Button, FormInstance, Table, TableProps} from "antd";
import {DataType} from "@/shared";
import React from "react";
import {DeleteOutlined} from "@ant-design/icons";
import {useTableFormHook} from "@/widget/tableForm/hook/useTableFormHook";

type TProps = {
  setGoodsItems: (item: DataType[]) => void,
  goodsItems: Array<DataType>
  form: FormInstance<any>;
  fieldName: string;
}
type ColumnTypes = Exclude<TableProps<DataType>["columns"], undefined>;

export const TableForm: React.FC<TProps> = ({
                                              goodsItems, setGoodsItems, form,
                                              fieldName
                                            }) => {

  const {handleDelete, handleSave, components} = useTableFormHook(goodsItems, setGoodsItems, form,
    fieldName);
  const columns: (ColumnTypes[number] & { dataIndex: string, editable?: boolean })[] = [
    {
      title: "Название товара",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Сумма",
      dataIndex: "prices",
      key: "prices",
      editable: true,
    },
    {
      title: "Скидка",
      dataIndex: "sum_discounted",
      key: "sum_discounted",
      editable: true,
    },
    {
      title: "Количество",
      dataIndex: "unit",
      key: "unit",
      editable: true,
    },
    {
      title: "Единица",
      dataIndex: "unit_name",
      key: "unit_name",
      editable: false,
    }, {
      title: "Итого",
      dataIndex: "paid_rubles",
      key: "paid_rubles",
      editable: true,
    },
    {
      title: "Действие",
      dataIndex: "action",
      key: "action",
      render: (el, record) => {
        return el !== undefined && <Button onClick={() => handleDelete(record.key)}><DeleteOutlined/></Button>;
      },
    },

  ];

  const columnsEdit = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        dataIndex: col.dataIndex,
        editable: col.editable,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <Table<DataType>
      components={components}
      bordered
      scroll={{x: "100%"}}
      columns={columnsEdit as ColumnTypes}
      rowClassName={() => "editable-row"}
      dataSource={goodsItems}
    />
  );
};