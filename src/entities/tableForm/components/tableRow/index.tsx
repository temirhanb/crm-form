import React from "react";
import {Form, FormInstance} from "antd";

interface EditableRowProps {
  index: number;
}
const EditableContext = React.createContext<FormInstance<any> | null>(null);

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