import axios from "axios";

// Constantes
const dataInitial = {
  results: [],
  offset: 0,
};
const GET_POKE_SUCCESS = "GET_POKE_SUCCESS";
const GET_POKE_NEXT_SUCCESS = "GET_POKE_NEXT_SUCCESS";

// Reducer
export default function pokeReducer(state = dataInitial, action) {
  switch (action.type) {
    case GET_POKE_SUCCESS:
      return { ...state, results: action.payload };
    case GET_POKE_NEXT_SUCCESS:
      return {
        ...state,
        results: action.payload.results,
        offset: action.payload.offset,
      };
    default:
      return state;
  }
}

// Acciones
export const getPokemonsAction = () => async (dispatch, getState) => {
  const { offset } = getState().pokemons;
  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`
    );
    dispatch({
      type: GET_POKE_SUCCESS,
      payload: res.data.results,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getNextPokemonsAction =
  (offsetNumber) => async (dispatch, getState) => {
    const { offset } = getState().pokemons;
    const nextPokemons = offset + offsetNumber;

    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${nextPokemons}&limit=20`
      );
      dispatch({
        type: GET_POKE_NEXT_SUCCESS,
        payload: {
          results: res.data.results,
          offset: nextPokemons,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
