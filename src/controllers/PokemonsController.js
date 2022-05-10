import store from "../redux/store";
import { pokemonsServices } from "../services/pokemonsServices";
import { setPokemons } from "../redux/pokeSlice";

export const getPokemonsController = async () => {
  try {
    let response = await pokemonsServices().getPokemonsServices();

    let informationPoke = [];
    const pokemonsUrl = await response.data.results.map((poke) => poke.url);
    informationPoke = await Promise.all(
      pokemonsUrl.map(async (url) => {
        let pokeInformation =
          await pokemonsServices().getPokemonDetailsServices(url);
        return pokeInformation.data;
      })
    );
    store.dispatch(setPokemons(informationPoke));
  } catch (error) {}
};
