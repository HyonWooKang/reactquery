import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type PokemonListItem = {
  name: string;
  url: string;
};

type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

const fetchPokemonList = async (): Promise<PokemonListResponse> => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=30");
  if (!res.ok) throw new Error("Failed to fetch pokemon list");
  return res.json();
};

export default function Home() {
  const { data, isLoading, error } = useQuery<PokemonListResponse>({
    queryKey: ["pokemon-list"],
    queryFn: fetchPokemonList,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading Pokémon list</p>;

  const list = data?.results ?? [];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Pokémon List</h1>
      <ul>
        {list.map((poke) => (
          <li key={poke.name}>
            <Link to={`/detail/${poke.name}`}>{poke.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
