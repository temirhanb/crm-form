"use client";
import React from "react";
import {FormsItem} from "@/entities/from/components/formsItem";
import {Button, Flex, Form, FormProps, Input, Select} from "antd";
import {NomenclatureModal} from "@/widget/nomenclatureModal";
import {TableForm} from "@/widget/tableForm";
import {data, DataType} from "@/shared";
import {useFormCRMHook} from "@/widget/form/hook/useFormCRMHook";
import {addOrder} from "@/widget/form/api/addOrder";

export type FieldType = {
  token?: string;
  contragent?: string;
  payboxs?: string;
  warehouses?: string;
  organizations?: string;
  money?: string;
  priceType?: string;
  goodsItems?: DataType[];
};

type TProps = {
  closeForm: () => void
}
export const FormCRM: React.FC<TProps> = ({closeForm}) => {

  const {
    tokenCashBox,
    payboxs,
    contragents,
    organization,
    priceType,
    warehouse,
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

    return addOrder([{
      dated: Date.now(),
      operation: "Заказ",
      tax_included: true,
      tax_active: true,
      goods: values.goodsItems?.map(item => {
        console.log(item);
        return {
          discount: item.discount === null ? 0 : item.discount,
          nomenclature: item.id,
          price: item.prices === null ? 0 : item.prices,
          quantity: 0,
          sum_discounted: item.sum_discounted === null ? 0 : item.sum_discounted,
          unit: item.unit === null ? 116 : item.unit
        };
      }),
      settings: {
        date_next_created: null
      },
      warehouse: values.warehouses,
      contragent: values.contragent,
      paybox: values.payboxs,
      organization: values.organizations,
      status: false,
    }]);
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
        rules={[{required: false, message: "Пожалуйста укажите токен кассы!"}]}
      >
        <div className={"width-full mt-2"}>
          <p>Токен кассы</p>
          <Select
            style={{width: "100%", fontSize: 14,}}
          >
            {tokenCashBox.map((item) => (
              <Select.Option key={item.token} defaultValue={item.token} value={item.token}>{item[0]}</Select.Option>
            ))}
          </Select>
        </div>
      </Form.Item>
      <Form.Item<FieldType>
        name="contragent"
        rules={[{required: true, message: "Пожалуйста укажите телефон!"}]}
      >
        <FormsItem name={"Контрагент"} formField={"contragent"} form={form} fieldName={"name"} result={contragents}/>
      </Form.Item>
      <Form.Item<FieldType>
        name="payboxs"
        rules={[{required: true, message: "Пожалуйста укажите счет покупателя!"}]}
      >
        <FormsItem name={"Счет поступления"} formField={"payboxs"} form={form} fieldName={"name"} result={payboxs}/>
      </Form.Item>
      <Form.Item<FieldType>
        name="organizations"
        rules={[{required: true, message: "Пожалуйста укажите организацию!"}]}
      >
        <FormsItem name={"Организация"} formField={"organizations"} form={form} fieldName={"type"}
                   result={organization}/>
      </Form.Item>
      <Form.Item<FieldType>
        name="warehouses"
        rules={[{required: true, message: "Пожалуйста укажите склад!"}]}
      >
        <FormsItem name={"Склад отгрузки"} formField={"warehouses"} form={form} fieldName={"name"} result={warehouse}/>
      </Form.Item>
      <Form.Item<FieldType>
        name="priceType"
        rules={[{required: false, message: "Пожалуйста укажите баллы!"}]}
      >
        <FormsItem name={"Тип цены"} formField={"points"} form={form} fieldName={"name"} result={priceType}/>
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