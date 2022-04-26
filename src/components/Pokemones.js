// hooks react redux
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import "../css/Pokemons.css";
// importamos la acción
import {
  getPokemonsAction,
  getPreviousPokemonsAction,
} from "../redux/pokesDucks";
import { getNextPokemonsAction } from "../redux/pokesDucks";

const Pokemons = () => {
  const [isLoading, setIsLoading] = useState(false);
  // declaramos displach para llamar a la acción o acciones
  const dispatch = useDispatch();

  // crearmos el state utilizando nuestra tienda
  // store.pokemones lo sacamos de la tienda
  const pokemons = useSelector((store) => store.pokemons.results);

  useEffect(() => {
    const getPokemons = async () => {
      setIsLoading(true);
      await dispatch(getPokemonsAction());
      setIsLoading(false);
    };
    getPokemons();
  }, [dispatch]);
  return (
    <div>
      <h1>Pokemons!</h1>

      <button onClick={() => dispatch(getPreviousPokemonsAction())}>
        Previous
      </button>
      <button onClick={() => dispatch(getNextPokemonsAction())}>Next</button>
      <div className="pokemons-container">
        {pokemons.map((item) => (
          <div className="pokemon-card" key={item.name}>
            <img
              alt={item.sprites.front_default}
              src={item.sprites.other.dream_world.front_default}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pokemons;
