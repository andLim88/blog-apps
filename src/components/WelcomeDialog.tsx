'use client';

import { useState } from 'react';
import { Modal, Input, message } from 'antd';

export default function WelcomeDialog() {
  const [visible, setVisible] = useState(true);
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const handleOk = () => {
    if (!name || !token) {
      messageApi.error('Name and Token are required!');
      return;
    }
    localStorage.setItem('name', name);
    localStorage.setItem('token', token);
    setVisible(false);
    messageApi.success('Welcome!');
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Welcome"
        visible={visible}
        onOk={handleOk}
        closable={false}
        maskClosable={false}
        footer={null}
      >
        <Input
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="Enter GoRest API Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={{ marginTop: '1rem' }}
        />
        <div className="mt-4 text-right">
          <button
            onClick={handleOk}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </Modal>
    </>
  );
}
