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
    // query options
    enabled: true, // 조건부 동작
    staleTime: 0, // refetch 주기 // milisecond
    gcTime: 5 * 60 * 1000, // 캐시 삭제 시간 - 5분
    refetchOnWindowFocus: true, // 해당 화면에 포커스 오면 refetch
    refetchOnReconnect: true, // 네트워크 끊기면 refetch
    refetchInterval: false, // 주기적으로 데이터 refetch
    retry: 3, // 실패시 재시도 횟수
    select: (data) => data, // 응답값을 내가 원하는대로 변환 ex).slice(0, 5)
    initialData: undefined, // 초기값 지정
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
