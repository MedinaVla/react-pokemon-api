// hooks react redux
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

// importamos la acción
import { getPokemonsAction } from "../redux/pokesDucks";
import { getNextPokemonsAction } from "../redux/pokesDucks";

const Pokemons = () => {
  // declaramos displach para llamar a la acción o acciones
  const dispatch = useDispatch();

  // crearmos el state utilizando nuestra tienda
  // store.pokemones lo sacamos de la tienda
  const pokemons = useSelector((store) => store.pokemons.results);

  useEffect(() => {
    function getPokemons() {
      dispatch(getPokemonsAction());
    }
    getPokemons();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Pokemones!</h1>
      <button onClick={() => dispatch(getPokemonsAction())}>Obtener</button>
      <button onClick={() => dispatch(getNextPokemonsAction(20))}>
        Siguientes
      </button>
      <ul>
        {pokemons.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Pokemons;
