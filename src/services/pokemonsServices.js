import axios from "axios";

export const pokemonsServices = () => ({
  getPokemonsServices: async () =>
    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`),
  getPokemonDetailsServices: async (url) => {
    return axios.get(url);
  },
});
