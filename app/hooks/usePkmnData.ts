import { useQuery } from "@tanstack/react-query";
import { PkmnSprites } from "../types/types";

const usePkmnData = (id: number) => {
  const {
    isLoading: isPending,
    error,
    data: pkmnData,
  } = useQuery<PkmnSprites>({
    queryKey: ["pkmnSprites", id],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json(),
      ),
  });

  return { pkmnData, isPending, error };
};

export default usePkmnData;
