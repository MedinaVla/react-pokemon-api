import axios from "axios";

// Constantes
const initialState = {
  results: [],
  offset: 0,
  unPokemon: null,
};
const GET_POKE_SUCCESS = "GET_POKE_SUCCESS";
const GET_POKE_NEXT_SUCCESS = "GET_POKE_NEXT_SUCCESS";
const GET_POKE_PREVIOUS_SUCCESS = "GET_POKE_PREVIOUS_SUCCESS";
const POKE_INFO_EXITO = "POKE_INFO_EXITO";
// Reducer
export default function pokeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POKE_SUCCESS:
      return { ...state, ...action.payload };
    case GET_POKE_NEXT_SUCCESS:
      return { ...state, ...action.payload };
    case GET_POKE_PREVIOUS_SUCCESS:
      return { ...state, ...action.payload };

    case POKE_INFO_EXITO:
      return { ...state, unPokemon: action.payload };
    default:
      return state;
  }
}

// Acciones
export const getPokemonsAction = () => async (dispatch, getState) => {
  try {
    const res = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20"
    );
    let informationPoke = [];
    const pokemonsUrl = await res.data.results.map((poke) => poke.url);
    informationPoke = await Promise.all(
      pokemonsUrl.map(async (url) => {
        // console.log(url);
        const pokeInformation = await axios.get(url);
        return pokeInformation.data;
      })
    );
    // informationPoke.map((item) => console.log(item.data.sprites.front_default));

    dispatch({
      type: GET_POKE_SUCCESS,
      payload: { results: informationPoke },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getNextPokemonsAction = () => async (dispatch, getState) => {
  const { offset } = getState().pokemons;
  const next = offset + 20;

  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${next}&limit=20`
    );

    let informationPoke = [];
    const pokemonsUrl = await res.data.results.map((poke) => poke.url);
    informationPoke = await Promise.all(
      pokemonsUrl.map(async (url) => {
        console.log(url);
        const pokeInformation = await axios.get(url);
        return pokeInformation.data;
      })
    );
    dispatch({
      type: GET_POKE_NEXT_SUCCESS,
      payload: {
        results: informationPoke,
        offset: next,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getPreviousPokemonsAction = () => async (dispatch, getState) => {
  const { offset } = getState().pokemons;
  const previous = offset === 0 ? 0 : offset - 20;

  try {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${previous}&limit=20`
    );
    let informationPoke = [];
    const pokemonsUrl = await res.data.results.map((poke) => poke.url);
    informationPoke = await Promise.all(
      pokemonsUrl.map(async (url) => {
        console.log(url);
        const pokeInformation = await axios.get(url);
        return pokeInformation.data;
      })
    );

    dispatch({
      type: GET_POKE_NEXT_SUCCESS,
      payload: {
        results: informationPoke,
        offset: previous,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const unPokeDetalleAccion = (url) => async (dispatch, getState) => {
  if (url === undefined) {
    url = "https://pokeapi.co/api/v2/pokemon/1/";
  }
  //   if (localStorage.getItem(url)) {
  //     dispatch({
  //       type: POKE_INFO_EXITO,
  //       payload: JSON.parse(localStorage.getItem(url)),
  //     });
  //     return;
  //   }
  try {
    const res = await axios.get(url);
    // console.log(res.data)
    dispatch({
      type: POKE_INFO_EXITO,
      payload: {
        name: res.data.name,
        photo: res.data.sprites.front_default,
        height: res.data.height,
        weight: res.data.weight,
      },
    });
    // localStorage.setItem(url, JSON.stringify({
    //     nombre: res.data.name,
    //     foto: res.data.sprites.front_default,
    //     alto: res.data.height,
    //     ancho: res.data.weight
    // }))
  } catch (error) {
    console.log(error.response);
  }
};
