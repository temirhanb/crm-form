"use client";
import React from "react";
import {FormsItem} from "@/entities/from/components/formsItem";
import {Button, Flex, Input} from "antd";
import {NomenclatureModal} from "@/widget/nomenclatureModal";
import {TableForm} from "@/widget/tableForm";
import {data} from "@/shared";
import {useFormCRMHook} from "@/widget/form/hook/useFormCRMHook";

export const FormCRM = () => {

  const {
    tokenCashBox,
    phonesNumbers,
    receiptAccount,
    organizations,
    warehouses,
    points,
    money,
    showModal,
    value,
    setValue,
    setGoodsItems,
    setDataSource,
    goodsItems,
    handleOk,
    handleCancel,
    isModalOpen
  } = useFormCRMHook();

  return (
    <form className={""}>
      <FormsItem name={"Касса"} result={tokenCashBox}/>
      <FormsItem name={"Телефон"} result={phonesNumbers}/>
      <FormsItem name={"Счет поступления"} result={receiptAccount}/>
      <FormsItem name={"Организация"} result={organizations}/>
      <FormsItem name={"Склад отгрузки"} result={warehouses}/>
      <FormsItem name={"Баллами"} result={points}/>
      <FormsItem name={"Рублями"} result={money}/>
      <Flex style={{marginTop: 10}}>
        <Button
          onClick={showModal} type="primary"
          style={{
            borderRadius: "5px 0 0 5px"
          }}
        >Выбрать</Button>
        <Input
          style={{
            borderRadius: "0 5px 5px 0"
          }}
          placeholder="Найти товар"
          value={value}
          onChange={e => {
            const currValue = e.target.value;
            setValue(currValue);
            const filteredData = data.filter(entry =>
              entry.name.includes(currValue)
            );
            setDataSource(filteredData);
          }}
        />
      </Flex>
      <div className={"border mt-[10px] rounded-md shadow-md overflow-y-scroll h-48 scrollbar"}>
        <TableForm setGoodsItems={setGoodsItems} goodsItems={goodsItems}/>
      </div>
      <NomenclatureModal
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        setGoodsItems={setGoodsItems}
      />
    </form>
  );
};