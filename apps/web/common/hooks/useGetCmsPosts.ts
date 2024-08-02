import { useQuery } from "@tanstack/react-query";

type CmsPost = {
  docs: [{ slug: string }],
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage: unknown
  page: number
  pagingCounter: number
  prevPage: unknown
  totalDocs: number
  totalPages: number
}

export async function getCmsPosts(page: string) {
  const response = await fetch('http://localhost:3000/api/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: CmsPost = await response.json();
  const filterPost = data.docs.find((post) => post.slug === page)
  return filterPost;
}

function useGetCmsPosts(page: string) {
  const query = useQuery({
    queryKey: ["cms-data", page],
    queryFn: () => getCmsPosts(page),
  });
  return query;
}

export default useGetCmsPosts;
