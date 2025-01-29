import { useQuery } from "@tanstack/react-query";
import { PokemonDetails } from "../types/types";

const usePkmnDescriptions = (id: number) => {
  const {
    isLoading: descIsPending,
    error: descError,
    data: details,
  } = useQuery<PokemonDetails>({
    queryKey: ["pkmnDetails", id],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json(),
      ),
  });

  return { details, descIsPending, descError };
};

export default usePkmnDescriptions;
