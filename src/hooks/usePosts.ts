import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://gorest.co.in/public/v2/posts';
const TOKEN = 'e1acc7d6b8e38ad04859aea62855e5d4806537042ab4c71b60bfbf21aa9e2bfd'; // Token Anda

export async function fetchPosts(page: number) {
  const response = await axios.get(API_URL, {
    params: { page, per_page: 10 },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  return response.data;
}

export function usePosts(page: number) {
  return useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(page),
    keepPreviousData: true,
  });
}
