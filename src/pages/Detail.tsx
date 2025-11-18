import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

type PokemonSprite = {
  front_default: string;
};

type PokemonType = {
  slot: number;
  type: {
    name: string; // fire, water, etc
    url: string;
  };
};

type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string; // hp, defense, etc
    url: string;
  };
};

type PokemonDetail = {
  id: number;
  name: string;
  sprites: PokemonSprite;
  types: PokemonType[];
  stats: PokemonStat[];
  height: number;
  weight: number;
};

const fetchPokemonDetail = async (name: string): Promise<PokemonDetail> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  if (!res.ok) throw new Error("Failed to fetch detail");
  return res.json();
};

const DetailPage = () => {
  const { name } = useParams<{ name: string }>();
  const { data, isLoading, error } = useQuery({
    queryKey: ["pokemon-detail", name],
    queryFn: () => fetchPokemonDetail(name as string),
    enabled: !!name, // 이름 없으면 요청X
  });

  if (isLoading) return <p>Loading Pokémon...</p>;
  if (error) return <p>Error loading Pokémon details</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textTransform: "capitalize" }}>{data?.name}</h1>
      <img
        src={data?.sprites?.front_default}
        alt={data?.name}
        style={{ width: 150 }}
      />
      <h3>Types</h3>
      <ul>
        {data?.types.map((t) => (
          <li key={t.slot}>{t.type.name}</li>
        ))}
      </ul>
      <h3>Stats</h3>
      <ul>
        {data?.stats.map((s) => (
          <li key={s.stat.name}>
            {s.stat.name}: {s.base_stat}
          </li>
        ))}
      </ul>
      <h3>Info</h3>
      <p>Height: {data?.height}</p>
      <p>Weight: {data?.weight}</p>
    </div>
  );
};
export default DetailPage;
