// hooks react redux
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import PokemonDetail from "./PokemonDetail";
import "../css/Pokemons.css";
// importamos la acción
import {
  getPokemonsAction,
  getPreviousPokemonsAction,
} from "../redux/pokesDucks";
import { getNextPokemonsAction } from "../redux/pokesDucks";

const Pokemons = () => {
  const [isLoading, setIsLoading] = useState(true);
  // declaramos displach para llamar a la acción o acciones
  const dispatch = useDispatch();

  // crearmos el state utilizando nuestra tienda
  // store.pokemones lo sacamos de la tienda
  const pokemons = useSelector((store) => {
    return store.pokemons.results;
  });

  useEffect(() => {
    const getPokemons = async () => {
      try {
        await dispatch(getPokemonsAction());
        setIsLoading(false);
      } catch (error) {
        console.log("Hubo un problema con la petición Fetch:" + error.message);
      }
    };
    setTimeout(() => {
      getPokemons();
    }, 2000);
  }, [dispatch]);

  return (
    <div>
      <div className="poke-header">
        <h1>Pokemons!</h1>

        <button
          className="actions-poke-button"
          onClick={() => dispatch(getPreviousPokemonsAction())}
        >
          Previous
        </button>
        <button
          className="actions-poke-button"
          onClick={() => dispatch(getNextPokemonsAction())}
        >
          Next
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="pokemons-container">
          {pokemons.map((item) => {
            const modal = "#" + item.name;
            return (
              <div className="pokemon-card" key={item.name}>
                <span className="card-background-hover"></span>
                <div className="card-name-hover">{item.name}</div>
                <a className="card-button-hover" href={modal}>
                  Details
                </a>

                <PokemonDetail poken={item} />

                <img
                  alt={item.sprites.front_default}
                  src={item.sprites.other.dream_world.front_default}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Pokemons;
