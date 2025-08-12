import React, {useEffect, useState} from "react";
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

  const [valueName, setValueName] = useState(editableItem.name);
  const [valueDiscount, setValueDiscount] = useState(!editableItem.discount ? 0 : editableItem.discount);
  const [valuePrice, setValuePrice] = useState(!editableItem.prices ? 0 : editableItem.prices);
  const [valueQuantity, setValueQuantity] = useState(!editableItem.quantity ? 1 : editableItem.quantity);
  const paid = (valuePrice * valueQuantity) - ((valuePrice * valueQuantity) * (valueDiscount / 100));
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
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

  const handlerEditItem = (row) => {
    const newData: DataType[] = [...goodsItems];
    const index = newData.findIndex((item) => editableItem.id === item.id);
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
    const newData = goodsItems.filter(item => item.id !== editableItem.id);
    setGoodsItems(newData);
    handleOk();
  };

  useEffect(() => {
    setValueQuantity(!editableItem.quantity ? 1 : editableItem.quantity);
    setValuePrice(!editableItem.prices ? 0 : editableItem.prices);
    setValueDiscount(!editableItem.discount ? 0 : editableItem.discount);
    setValueName(editableItem.name);
  }, [editableItem.id]);

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
      <div style={{marginTop: 10}}>
        <span>Название</span>
        <Input onChange={handlerChangeName} value={valueName}/>
      </div>
      <div style={{marginTop: 10}}>
        <span>Сумма</span>
        <Input onChange={handlerChangePrice} value={valuePrice}/>
      </div>
      <div style={{marginTop: 10}}>
        <span>Скидка</span>
        <Input onChange={handlerChangeDiscount} value={valueDiscount}/>
      </div>
      <div style={{marginTop: 10}}>
        <span>Количество</span>
        <Input onChange={handlerChangeQuantity} value={valueQuantity}/>
      </div>
      <div style={{marginTop: 10}}>
        <span>Еденица</span>
        <Input disabled={true} value={editableItem.unit_name}/>
      </div>
      <div style={{display: "flex", alignItems: "center"}}>
        <h1 style={{fontSize: "24px", marginRight: "10px"}}>Итого:</h1>
        <span style={{fontSize: "20px",}}>{valueDiscount !== null ? paid : valuePrice * valueQuantity}</span>
      </div>
    </Modal>
  );
};