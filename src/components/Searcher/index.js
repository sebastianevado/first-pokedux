import React, { useRef } from 'react';
import { Grid, Search } from 'semantic-ui-react';
import './styles.css';

export default function SearchBar() {

  const searcherPokemon = useRef()

  const searchPokemon = () => {
    // searcherPokemon.current.value
    console.log(searcherPokemon)
  }

  return (
    <div className='Searcher wrapper'>
      <Grid>
        <Grid.Column
          widescreen={10}
          largeScreen={10}
          mobile={16}
          className='Searcher'
        >
          <Search
            aligned='right'
            input={{ fluid: true }}
            showNoResults={false}
            placeholder='Encuentra a tu Pokemón favorito'
            onSearchChange={() => searchPokemon}
            ref={searcherPokemon}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
}
