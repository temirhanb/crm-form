"use client";
import {Select} from "antd";
import {useEffect, useState} from "react";
import {fetchDataBase, fetchGoods} from "@/widget/form/api";

export const FormCRM = () => {
  // const file = await fs.readFile(process.cwd() + '/bd/example.json', 'utf8');
  const [result, setResult] = useState([]);
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    fetchDataBase().then(res => {
      setResult(res.result);
    });
    fetchGoods().then(res => {
      setGoods(res.result);
    });
  }, []);

  return (
    <form className={""}>
      <div className={"width-full"}>
        <p>Касса:</p>
        <Select
          style={{width: "100%"}}
          className={"width-[100%] bg-red"}
        >
          {result.map(({sales_manager}) => (
            <Select.Option key={sales_manager} value={sales_manager}>{sales_manager}</Select.Option>
          ))}
        </Select>
      </div>
      <div>
        <p>Телефон:</p>
        <Select className={"width-full"}>
          {result.map(({phone}) => (
            <Select.Option value={phone}>{phone}</Select.Option>
          ))}
        </Select>
      </div>
      <div>
        <p>Счет поступления:</p>
        <Select>
          <Select.Option value="sample">Sample</Select.Option>
        </Select>
      </div>
      <div>
        <p>Организация:</p>
        <Select>
          {result.map(({organization}) => (
            <Select.Option value={organization}>{organization}</Select.Option>
          ))}
        </Select>
      </div>
      <div>
        <p>Склад отгрузки:</p>
        <Select>
          {result.map(({warehouse}) => (
            <Select.Option value={warehouse}>{warehouse}</Select.Option>
          ))}
        </Select>
      </div>

      <div>
        <p>Баллами:</p>
        <Select>
          <Select.Option value="sample">Sample</Select.Option>
        </Select>
      </div>
      <div>
        <p>Рублями:</p>
        <Select>
          <Select.Option value="sample">Sample</Select.Option>
        </Select>
      </div>

      <div>
        <p>Товар:</p>
        <Select>
          <Select.Option value="sample">Sample</Select.Option>
        </Select>
      </div>
      <div className={"border rounded-md shadow-md"}>
        <div>
          <span>Name</span>
          <input type="text"/>
        </div>
      </div>
      <button>Создать товар</button>
      <button>Создать и привезти</button>
    </form>
  );
};