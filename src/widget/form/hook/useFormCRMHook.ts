import {useState} from "react";
import {data, DataType} from "@/shared";

export const useFormCRMHook = () => {
  const [goodsItems, setGoodsItems] = useState<DataType[]>([]);

  const tokenCashBox = [123456789, 987654321];
  const points = [111, 222];
  const money = [1121, 2222];
  const phonesNumbers = [8999999, 8999666];
  const warehouses = ["Москва", "Область"];
  const organizations = ["ООО Рога и Копыта", "ЗАО Контора"];
  const receiptAccount = ["Рублевый", "Иностранный"];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [dataSource, setDataSource] = useState(data);
  const [value, setValue] = useState("");

  return {
    value,
    setValue,
    dataSource,
    setDataSource,
    showModal,
    handleCancel,
    handleOk,
    tokenCashBox,
    points,
    money,
    phonesNumbers,
    warehouses,
    organizations,
    receiptAccount,
    goodsItems,
    setGoodsItems,
    isModalOpen
  };
};