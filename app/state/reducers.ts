import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "../types/types";

interface PokemonState {
  members: (Pokemon | null)[];
}

const initialState: PokemonState = {
  members: Array(6).fill(null),
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    addPokemon: (state, action: PayloadAction<Pokemon>) => {
      const emptySlotIndex = state.members.findIndex(
        (member) => member === null,
      );
      if (emptySlotIndex !== -1) {
        state.members[emptySlotIndex] = action.payload;
      }
    },
    removePokemon: (state, action: PayloadAction<number>) => {
      state.members = state.members.map((member) =>
        member?.pokemonId === action.payload ? null : member,
      );
    },
  },
});

export const { addPokemon, removePokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;
