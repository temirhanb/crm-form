import {Button, FormInstance, Table, TableProps} from "antd";
import {DataType} from "@/shared";
import React, {useState} from "react";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {useTableFormHook} from "@/widget/tableForm/hook/useTableFormHook";
import {EditGoods} from "@/widget/editGoods";

type TProps = {
  setGoodsItems: (item: DataType[]) => void,
  goodsItems: Array<DataType>
  form: FormInstance<any>;
  fieldName: string;
}
type ColumnTypes = Exclude<TableProps<DataType>["columns"], undefined>;

export const TableForm: React.FC<TProps> = ({
                                              goodsItems,
                                              setGoodsItems,
                                              form,
                                              fieldName
                                            }) => {

  const
    {
      handleDelete,
      handleSave,
      components,
      editableItem,
      handlerEdit
    } = useTableFormHook(
      goodsItems,
      setGoodsItems,
      form,
      fieldName
    );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: (ColumnTypes[number] & { dataIndex: string, editable?: boolean })[] = [
    {
      title: "Название товара",
      dataIndex: "name",
      key: "name",
      editable: true,
    },
    {
      title: "Действие",
      dataIndex: "action",
      key: "action",
      render: (el, record) => {
        return (
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Button onClick={() => {
              setIsModalOpen(true);
              handlerEdit(record.key);
            }}><EditOutlined color={"cyan"}/></Button>
            <Button onClick={() => handleDelete(record.key)}><DeleteOutlined/></Button>
          </div>
        );
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
    <>
      <Table<DataType>
        components={components}
        bordered
        columns={columnsEdit as ColumnTypes}
        rowClassName={() => "editable-row"}
        dataSource={goodsItems}
      />
      {editableItem && (
        <EditGoods
          setGoodsItems={setGoodsItems}
          goodsItems={goodsItems}
          editableItem={editableItem}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};