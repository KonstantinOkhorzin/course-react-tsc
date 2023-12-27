import React, { useState, createContext, ReactNode, FC, useMemo } from 'react';

import { IPokemon } from '../types';

export interface IContext {
  pokemon: IPokemon | null;
  setPokemon: React.Dispatch<React.SetStateAction<IPokemon | null>>;
}

interface Props {
  children: ReactNode;
}

export const Context = createContext<IContext | null>(null);

const Provider: FC<Props> = ({ children }) => {
  const [pokemon, setPokemon] = useState<IPokemon | null>(null);

  const providerValue = useMemo(() => {
    return { pokemon, setPokemon };
  }, [pokemon]);

  return <Context.Provider value={providerValue}>{children}</Context.Provider>;
};

export default Provider;
