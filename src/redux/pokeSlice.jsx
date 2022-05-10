import { createSlice } from "@reduxjs/toolkit";

export const pokeSlice = createSlice({
  name: "pokemons",
  initialState: {
    results: [],
    offset: 0,
    pokemon: null,
  },
  reducers: {
    setPokemons: (state, ...rest) => {
      state.results = rest[0].payload;
    },
  },
});

export const { setPokemons } = pokeSlice.actions;

export default pokeSlice.reducer;
