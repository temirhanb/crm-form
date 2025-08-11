"use client";
import React from "react";
import {FormsItem} from "@/entities/from/components/formsItem";
import {Button, Flex, Form, FormProps, Input} from "antd";
import {NomenclatureModal} from "@/widget/nomenclatureModal";
import {TableForm} from "@/widget/tableForm";
import {data, DataType} from "@/shared";
import {useFormCRMHook} from "@/widget/form/hook/useFormCRMHook";
import {addOrder} from "@/widget/form/api/addOrder";

export type FieldType = {
  token?: string;
  phone?: string;
  receiptAccount?: string;
  warehouses?: string;
  organizations?: string;
  money?: string;
  points?: string;
  goodsItems?: DataType[];
};

type TProps = {
  closeForm: () => void
}
export const FormCRM: React.FC<TProps> = ({closeForm}) => {

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

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    closeForm();

    return addOrder({
      dated: Date.now(),
      operation: "Заказ",
      tax_included: true,
      tax_active: true,
      goods: values.goodsItems?.map(item => {
        return {
          unit: 116,
          price: item.price,
          quantity: item.quantity,
          sum_discounted: item.sum_discounted,
          discount: item.sum_discounted,
          nomenclature: 46540,
        };
      }),
      settings: {
        date_next_created: null
      },
      loyality_card_id:22476,
      warehouse: 50,
      contragent: 355176,
      paybox: 759,
      organization: 38,
      status: false,
      paid_rubles: values.goodsItems?.reduce((first, last) => (last.paid_rubles + first), 0),
      paid_lt: 0
    });
  };


  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [form] = Form.useForm();

  return (
    <Form
      onFinish={onFinish}
      form={form}
      onFinishFailed={onFinishFailed}
      name={"add-goods"}>
      <Form.Item<FieldType>
        name="token"
        rules={[{required: true, message: "Пожалуйста укажите кассу!"}]}
      >
        <FormsItem name={"Касса"} form={form} fieldName={"token"} result={tokenCashBox}/>
      </Form.Item>
      <Form.Item<FieldType>
        name="phone"
        rules={[{required: true, message: "Пожалуйста укажите телефон!"}]}
      >
        <FormsItem name={"Телефон"} form={form} fieldName={"phone"} result={phonesNumbers}/>
      </Form.Item>
      <Form.Item<FieldType>
        name="receiptAccount"
        rules={[{required: true, message: "Пожалуйста укажите счет покупателя!"}]}
      >
        <FormsItem name={"Счет поступления"} form={form} fieldName={"receiptAccount"} result={receiptAccount}/>
      </Form.Item>
      <Form.Item<FieldType>
        name="organizations"
        rules={[{required: true, message: "Пожалуйста укажите организацию!"}]}
      >
        <FormsItem name={"Организация"} form={form} fieldName={"organizations"} result={organizations}/>
      </Form.Item>
      <Form.Item<FieldType>
        name="warehouses"
        rules={[{required: true, message: "Пожалуйста укажите склад!"}]}
      >
        <FormsItem name={"Склад отгрузки"} form={form} fieldName={"warehouses"} result={warehouses}/>
      </Form.Item>
      <Form.Item<FieldType>
        name="points"
        rules={[{required: false, message: "Пожалуйста укажите баллы!"}]}
      >
        <FormsItem name={"Баллами"} form={form} fieldName={"points"} result={points}/>
      </Form.Item>
      <Form.Item<FieldType>
        name="money"
        rules={[{required: false, message: "Пожалуйста укажите рубли!"}]}
      >
        <FormsItem name={"Рублями"} form={form} fieldName={"money"} result={money}/>
      </Form.Item>
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
      <Form.Item<FieldType>
        name="goodsItems"
        style={{marginTop: 10}}
        rules={[{required: true, message: "Пожалуйста укажите товар!"}]}
      >
        <TableForm
          form={form}
          fieldName={"goodsItems"}
          setGoodsItems={setGoodsItems}
          goodsItems={goodsItems}
        />
      </Form.Item>
      <Form.Item style={{
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",

      }}>
        <Button key="submit" htmlType={"submit"} onClick={handleOk}>
          Cоздать продажи
        </Button>,
        <Button
          htmlType={"submit"}
          onClick={handleOk}
        >
          Cоздать и привезти
        </Button>,
      </Form.Item>
      <NomenclatureModal
        handleOk={handleOk}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        form={form}
        fieldName={"goodsItems"}
        setGoodsItems={setGoodsItems}
      />
    </Form>
  );
};