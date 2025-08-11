import {Select} from "antd";
import React from "react";

type TProps = {
  name: string
  result: Array<string | number>
}
export const FormsItem: React.FC<TProps> = ({name, result}) => {
  return (
    <div className={"width-full mt-2"}>
      <p>{name}</p>
      <Select
        style={{width: "100%", fontSize: 14,}}
      >
        {result.map((item) => (
          <Select.Option key={item} value={item}>{item}</Select.Option>
        ))}
      </Select>
    </div>
  );
};