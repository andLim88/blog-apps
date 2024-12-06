'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { notFound } from 'next/navigation';

interface PostProps {
  params: { id: string };
}

const fetchPostById = async (id: string, token: string) => {
  const response = await axios.get(`https://gorest.co.in/public/v2/posts/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default function PostDetail({ params }: PostProps) {
  const { id } = params;
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Menambahkan pengecekan token yang lebih jelas
    if (!token) {
      setError('Token not found. Please log in.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const data = await fetchPostById(id, token);
        setPost(data);
      } catch (err) {
        setError('Error fetching post.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Spin size="large" className="flex justify-center mt-10" />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  if (!post) return notFound();  // Handle case when the post is not found

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-4">{post.body}</p>
      <p className="text-gray-500">Author ID: {post.user_id}</p>
    </div>
  );
}
