import React from "react";
import {Form} from "antd";
import {EditableContext} from "@/widget/tableForm/hook/useTableFormHook";

interface EditableRowProps {
  index: number;
}

export const TableRow: React.FC<EditableRowProps> = ({index, ...props}) => {
  const [form] = Form.useForm();

  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};