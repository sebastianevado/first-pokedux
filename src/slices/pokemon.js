import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemons, getPokemonsWithDetails } from '../api/getPokemons';
import { setError, toggleLoading } from './ui';

const initialState = {
  list: [],
  details: [],
};

export const fetchPokemons = createAsyncThunk(
  'pokemon/fetchPokemons',
  async (_, { dispatch }) => {
    try {
      dispatch(toggleLoading());
      const response = await getPokemons();
      const pokemonsWithDetails = await getPokemonsWithDetails(
        response.results
      );
      dispatch(setPokemon(pokemonsWithDetails));
      dispatch(toggleLoading());
    } catch (err) {
      dispatch(setError({ error: err, message: 'Error fetching pokemons' }));
      dispatch(toggleLoading());
    }
  }
);



export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemon: (state, action) => {
      state.list = action.payload;
    },
    setFavorite: (state, action) => {
      const currentPokemonIndex = state.list.findIndex(
        (elem) => elem.id === action.payload.pokemonId
      );
      if (currentPokemonIndex >= 0) {
        state.list[currentPokemonIndex].isFavorite =
          !state.list[currentPokemonIndex].isFavorite;
      }
    },
    setDetails: (state, action) => {
      state.details = action.payload;
    }
  }
});

export const { setPokemon, setFavorite, setDetails } = pokemonSlice.actions;

export default pokemonSlice.reducer;