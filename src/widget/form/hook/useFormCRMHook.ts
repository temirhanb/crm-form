import {useEffect, useState} from "react";
import {data, DataType} from "@/shared";
import {apiFetchPaybox} from "@/shared/api/apiFetchPaybox";
import {
  apiFetchContragents,
  apiFetchNomenclature,
  apiFetchOrganizations,
  apiFetchPriceType,
  apiFetchWarehouse
} from "@/shared/api";

export const useFormCRMHook = () => {
  const [goodsItems, setGoodsItems] = useState<DataType[]>([]);

  const tokenCashBox = [{token: "af1874616430e04cfd4bce30035789907e899fc7c3a1a4bb27254828ff304a77"}];

  const [payboxs, setPayBox] = useState([]);
  const [contragents, setContragents] = useState([]);
  const [organization, setOrganizations] = useState([]);
  const [priceType, setPriceType] = useState([]);
  const [warehouse, setWarehouse] = useState([]);

  useEffect(() => {
    apiFetchPaybox().then(res => setPayBox(res));
    apiFetchContragents().then(res => setContragents(res));
    apiFetchOrganizations().then(res => setOrganizations(res));
    apiFetchPriceType().then(res => setPriceType(res));
    apiFetchWarehouse().then(res => setWarehouse(res));
  }, []);

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
    payboxs,
    contragents,
    organization,
    priceType,
    warehouse,
    goodsItems,
    setGoodsItems,
    isModalOpen
  };
};