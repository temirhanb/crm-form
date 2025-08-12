import {FormInstance, Select} from "antd";
import React from "react";

type TProps = {
  name: string
  fieldName: string
  formField: string
  form: FormInstance<any>
  result: Array<{ id: number | string }>
}
export const FormsItem: React.FC<TProps> = ({name, formField, fieldName, form, result}) => {

  const handlerChange = (value: string) => {
    console.log("132321", value);
    form.setFieldsValue({[formField]: value});
  };
  return (
    <div className={"width-full mt-2"}>
      <p>{name}</p>
      <Select
        onChange={(el) => handlerChange(el)}
        style={{width: "100%", fontSize: 14,}}
      >
        {result.map((item) => (
          <Select.Option key={item.id} value={item.id}>{item[fieldName]}</Select.Option>
        ))}
      </Select>
    </div>
  );
};