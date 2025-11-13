import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Recipe = {
  id: number;
  name: string;
  instructions: string[];
  // 필요한 만큼 더 추가 가능
};

type RecipeResponse = {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
};

const fetchRecipes = async (): Promise<RecipeResponse> => {
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const res = await fetch("https://dummyjson.com/recipes");
  if (!res.ok) throw Error("failed to fetch");
  return res.json();
};

export default function Home() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  });

  // console.log("data", data);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred</p>;

  const recipes = data?.recipes ?? [];

  return (
    <>
      <h1>Post List</h1>
      <ul>
        {/* {data?.slice(0, 10).map((post: any) => (
          <li key={post.id}>
            <Link to={`/detail/${post.id}`}>{post.title}</Link>
          </li>
        ))} */}
        {recipes.length > 0 ? (
          recipes.map((recipes) => (
            <li key={recipes.id}>
              <Link to={`/detail/${recipes.id}`}>{recipes.name}</Link>
            </li>
          ))
        ) : (
          <p>no data</p>
        )}
      </ul>
    </>
  );
}
