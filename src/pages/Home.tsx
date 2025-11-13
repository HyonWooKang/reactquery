import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw Error("failed to fetch");
  return res.json();
};

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  console.log("data", data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred</p>;

  return (
    <>
      <h1>Post List</h1>
      <ul>
        {data?.slice(0, 10).map((post: any) => (
          <li key={post.id}>
            <Link to={`/detail/${post.id}`}>{post.title}</Link>
          </li>
        ))}
        {/* {data.map((post: any) => (
          <li key={post.id}>
            <Link to={`/detail/${post.id}`}>{post.title}</Link>
          </li>
        ))} */}
      </ul>
    </>
  );
}
