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

  console.log(result, goods);
  return (
    <form>
      <div>
        <p>Касса:</p>
        <Select>
          {result.map(({sales_manager}) => (
            <Select.Option value={sales_manager}>{sales_manager}</Select.Option>
          ))}
        </Select>
      </div>
      <div>
        <p>Телефон:</p>
        <Select>
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
      <div>
        tovar
      </div>
      <button>Создать товар</button>
      <button>Создать и привезти</button>
    </form>
  );
};