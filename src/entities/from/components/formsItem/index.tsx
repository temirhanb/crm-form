import {FormInstance, Select} from "antd";
import React from "react";

type TProps = {
  name: string
  fieldName: string
  form: FormInstance<any>
  result: Array<string | number>
}
export const FormsItem: React.FC<TProps> = ({name, fieldName, form, result}) => {

  const handlerChange = (value: string) => {
    form.setFieldsValue({[fieldName]: value});
  };
  return (
    <div className={"width-full mt-2"}>
      <p>{name}</p>
      <Select
        onChange={handlerChange}
        style={{width: "100%", fontSize: 14,}}
      >
        {result.map((item) => (
          <Select.Option key={item} value={item}>{item}</Select.Option>
        ))}
      </Select>
    </div>
  );
};