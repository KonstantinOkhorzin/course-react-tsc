import { FC } from 'react';
import { Typography } from '@mui/material';

import { IPokemon } from '../../../types';
import { Wrapper } from './PokemonDataView.styled';

interface IPokemonDataViewProps {
  pokemon: IPokemon;
}

const PokemonDataView: FC<IPokemonDataViewProps> = ({ pokemon: { name, src, stats } }) => {
  return (
    <Wrapper>
      <Typography variant='h4'>{name}</Typography>
      <img src={src} alt='' width='240px' />
      <ul>
        {stats.map(entry => (
          <li key={entry.stat.name}>
            {entry.stat.name}: {entry.base_stat}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default PokemonDataView;
