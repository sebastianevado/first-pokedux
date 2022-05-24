import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, Label, Divider, Grid, Icon, Header } from 'semantic-ui-react';
import { setFavorite } from '../../slices/pokemon';
import { FAV_COLOR, MAIN_COLOR, DEFAULT_COLOR } from '../../utils/constants';
import './styles.css';

function PokemonCard({ pokemon }) {
  
  const details = useSelector((state) => state.pokemon.list);

  const dispatch = useDispatch();
  const handleFavorite = () => {
    dispatch(setFavorite({ pokemonId: pokemon.id }))
    console.log(pokemon.id)
  }

  const color = pokemon.isFavorite ? FAV_COLOR : DEFAULT_COLOR;
  return (
    <Grid.Column mobile={16} tablet={8} computer={4}>
      <div className="PokemonCard">
        <button className='PokemonCard-favorite' onClick={handleFavorite}>
          <Icon name="favorite" color={color} />
        </button>
        <Image centered src={pokemon.sprites.front_default} />
        <Header as='h4' color='orange' className="PokemonCard-title">{pokemon.name.toUpperCase()}</Header>
        <Divider />
        {pokemon.types.map(type => (<Label as='a' key={`${pokemon.id}-${type.type.name}`} color={MAIN_COLOR} tag >{type.type.name.toUpperCase()}</Label>))}
      </div>
    </Grid.Column>
  );
}

export default PokemonCard