import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Image, Label, Divider, Grid, Icon, Header, Modal, Button, Segment } from 'semantic-ui-react';
import { setFavorite } from '../../slices/pokemon';
import { FAV_COLOR, MAIN_COLOR, DEFAULT_COLOR } from '../../utils/constants';
import './styles.css';

function PokemonCard({ pokemon, key }) {

  const [details, setDetails] = useState([])
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch();

  useEffect (() => {
    fetch(pokemon.species.url)
    .then(res => res.json())
    .then(data => setDetails(data))
  },[])
  

  const handleFavorite = () => {
    dispatch(setFavorite({ pokemonId: pokemon.id }))
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
      <Modal
      size='mini'
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Show Pokeinfo</Button>}
      >
        <Modal.Header>{pokemon.name.toUpperCase()}</Modal.Header>
        <Modal.Content>
          <Image size='medium' src={pokemon.sprites.back_default} wrapped />
          <Modal.Description>
            <Header>
              {`Weight: ${pokemon.weight}`}
            </Header>
              <Label  className='label' color={details.color.name}>{`Pokemon color :  ${details.color.name.toUpperCase()}`}</Label>
              <Label className='label' >{`Base hapiness: ${details.base_happiness}`}</Label>
              <Label className='label' >{`Capture rate: ${details.capture_rate}%`}</Label>
              <Label className='label' >{`Habitat: ${details.habitat.name}`}</Label>
              {details.is_legendary && <Label color='yellow'>Legendary</Label>}
              {details.is_mythical && <Label color='yellow'>Mythical</Label>}
              <Label className='label' >{`Growth Rate: ${details.growth_rate.name}`}</Label>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Yep, that's my pokemon"
            labelPosition='right'
            icon='checkmark'
            onClick={() => setOpen(false)}
            positive
          />
        </Modal.Actions>
      </Modal>
    </Grid.Column>
  );
}

export default PokemonCard