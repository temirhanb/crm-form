import React, {useContext, useEffect, useRef, useState} from "react";
import {DataType} from "@/shared";
import {Form, Input, InputRef} from "antd";
import {EditableContext} from "@/widget/tableForm/hook/useTableFormHook";

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  editable: boolean;
  title: any;
  inputType: "number" | "text";
  record: DataType;
  index: number;
  handleSave: (record: DataType) => void;
  dataIndex: keyof DataType;
}

export const TableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = (
  {
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }
) => {

  const [editing, setEditing] = useState(false);
  const inputRef = useRef<InputRef>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({[dataIndex]: record[dataIndex]});
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({...record, ...values});
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{margin: 0}}
        name={dataIndex}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{paddingInlineEnd: 24}}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};