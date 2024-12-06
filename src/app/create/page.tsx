'use client';

import { useState } from 'react';
import axios from 'axios';
import { Input, Button, message } from 'antd';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async () => {
    if (!title || !body) {
      messageApi.error('Title and Body are required!');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://gorest.co.in/public/v2/posts',
        { title, body },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      messageApi.success('Post created successfully!');
    } catch (error) {
      messageApi.error('Failed to create post.');
    }
  };

  return (
    <div className="p-4 max-w-screen-lg mx-auto space-y-5">
      {contextHolder}
      <h2 className="text-xl font-bold">Create New Post</h2>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2"
      />
      <Input.TextArea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="mb-2"
      />
      <Button type="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
