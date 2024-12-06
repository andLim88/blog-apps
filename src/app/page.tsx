'use client';

import { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { Spin, Pagination } from 'antd';
import Link from 'next/link';
import { Button } from 'antd/es/radio';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = usePosts(currentPage);

  if (isLoading) return <Spin size="large" className="flex justify-center mt-10" />;
  if (isError) return <p className="text-center text-red-500">Error fetching posts.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      <Link href="/create">
        <Button type="primary" className="mb-4 bg-green-300">
          Create Post
        </Button>
      </Link>
      <ul className="space-y-4">
        {data?.length ? (
          data.map((post: any) => (
            <li key={post.id} className="flex flex-col bg-white border border-black shadow-2xl rounded-lg overflow-hidden">
              <Link href={`/post/${post.id}`} passHref>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-blue-600 hover:underline">{post.title}</h3>
                  <p className="text-gray-600 mt-2">{post.body.substring(0, 150)}...</p>
                </div>
              </Link>
              <div className="bg-gray-100 p-3 flex justify-between items-center">
                <span className="text-sm text-gray-500">Read more</span>
                <span className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">No posts available.</p>
        )}
      </ul>

      {/* Pagination Styling */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          onChange={(page) => setCurrentPage(page)}
          total={50}
          pageSize={10}
          className="flex justify-center space-x-2"
        />
      </div>
    </div>
  );
}
