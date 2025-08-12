import React, {useState} from "react";
import {Button, Input, Modal} from "antd";
import {DataType} from "@/shared";

type TProps = {
  isModalOpen: boolean
  setIsModalOpen: (item: boolean) => void;
  setGoodsItems: (item: DataType[]) => void;
  editableItem: DataType;
  goodsItems: DataType[]
}
export const EditGoods: React.FC<TProps> = ({setGoodsItems, goodsItems, isModalOpen, setIsModalOpen, editableItem}) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };
  console.log(editableItem);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [valueName, setValueName] = useState(editableItem.name);
  const [valueDiscount, setValueDiscount] = useState(!editableItem.discount ? 0 : editableItem.discount);
  const [valuePrice, setValuePrice] = useState(!editableItem.prices ? 0 : editableItem.prices);
  const [valueQuantity, setValueQuantity] = useState(!editableItem.quantity ? 1 : editableItem.quantity);

  const handlerChangeName = (e) => {
    setValueName(e.target.value);
  };

  const handlerChangePrice = (e) => {
    setValuePrice(e.target.value);
  };

  const handlerChangeDiscount = (e) => {
    setValueDiscount(e.target.value);
  };

  const handlerChangeQuantity = (e) => {
    setValueQuantity(e.target.value);
  };

  const paid = (valuePrice * valueQuantity) - ((valuePrice * valueQuantity) * (valueDiscount / 100));
  const handlerEditItem = (row) => {
    const newData: DataType[] = [...goodsItems];
    const index = newData.findIndex((item) => editableItem[0].id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    newData[index].prices = valuePrice;
    newData[index].name = valueName;
    newData[index].quantity = valueQuantity;
    newData[index].sum_discounted = valueDiscount;
    newData[index].paid_rubles = paid;
    setGoodsItems(newData);
    handleOk();
  };
  const handlerDeleteItem = (row) => {
    const newData = goodsItems.filter(item => item.id !== editableItem[0].id);
    setGoodsItems(newData);
    handleOk();
  };

  return (
    <Modal
      title="Редактировать товар"
      closable={{"aria-label": "Custom Close Button"}}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      style={{top: 20}}
      footer={[
        <Button color={"cyan"} onClick={handlerEditItem}>Сохранить</Button>,
        <Button variant="solid" color={"danger"} onClick={handlerDeleteItem}>Удалить</Button>
      ]}
    >
      <div>
        <span>Название</span>
        <Input onChange={handlerChangeName} value={valueName}/>
      </div>
      <div>
        <span>Сумма</span>
        <Input onChange={handlerChangePrice} value={valuePrice}/>
      </div>
      <div>
        <span>Скидка</span>
        <Input onChange={handlerChangeDiscount} value={valueDiscount}/>
      </div>
      <div>
        <span>Количество</span>
        <Input onChange={handlerChangeQuantity} value={valueQuantity}/>
      </div>
      <div>
        <span>Еденица</span>
        <Input disabled={true} value={editableItem.unit_name}/>
      </div>
      <div>
        <h1>Итого:</h1>
        <span>{valueDiscount !== null ? paid : valuePrice * valueQuantity}</span>
      </div>
    </Modal>
  );
};