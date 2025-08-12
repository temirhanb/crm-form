"use client";
import React, {useState} from "react";
import {Button, Modal} from "antd";
import {FormCRM} from "@/widget";

export default function Home() {
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

  return (
    <main className=" flex items-center items-center w-full h-full">
      <Button onClick={showModal}>Открыть окно</Button>
      <Modal
        title="Cоздать заказ"
        closable={{"aria-label": "Custom Close Button"}}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{top: 20}}
        footer={null}
      >
        <FormCRM closeForm={handleOk}/>
      </Modal>
    </main>
  );
}
