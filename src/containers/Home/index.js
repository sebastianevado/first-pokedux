/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Searcher from '../../components/Searcher';
import PokemonList from '../../components/PokemonList';
import { getPokemons } from '../../api/getPokemons';
import { setPokemonsWithDetails, setError } from '../../actions';
import './styles.css';
import Loader from '../../components/Loader';
import { fetchPokemons } from '../../slices/pokemon';

function Home() {
  const pokemons = useSelector((state) => state.pokemon.list);
  const loading = useSelector((state) => state.ui.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemons(pokemons));
    // getPokemons()
    //   .then((res) => {
    //     dispatch(setPokemonsWithDetails(res.results));
    //   })
    //   .catch((error) => {
    //     dispatch(setError({ message: 'Ocurrió un error', error }));
    //   });
  }, []);

  return (
    <div className='Home'>
      {loading && <Loader />}
      <PokemonList pokemons={pokemons} />
    </div>
  );
}

export default Home;
