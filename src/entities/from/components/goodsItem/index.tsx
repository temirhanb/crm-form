import React, {useId} from "react";
import {Input} from "antd";

type TProps = {
  name: string,
  item: string | number
}
export const GoodsItem: React.FC<TProps> = ({name, item}) => {
  const id = useId();
  return (
    <div key={id} className={"flex h-16 border-b items-center flex-row "}>
      <div className={"w-[90px] border-r h-full flex  items-center pl-[10px]"}>
        <span>{name} </span>
      </div>
      <div className={"mx-[10px]"}>
        <Input type="text" defaultValue={item}/>
      </div>
    </div>
  );
};