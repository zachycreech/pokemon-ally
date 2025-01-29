export type Pokemon = {
  pokemonId: number;
  name: string;
  image: string;
};

export type SpritesType = {
  front_default: string;
  back_default: string;
};

export type PkmnTypes = {
  type: {
    name: string;
  };
};

export type PkmnSprites = {
  name: string;
  sprites: SpritesType;
  types: PkmnTypes[];
};

export type FlavorTextEntry = {
  version: {
    name: string;
  };
  language: {
    name: string;
  };
  flavor_text: string;
};

export type PokemonDetails = {
  flavor_text_entries: FlavorTextEntry[];
};
