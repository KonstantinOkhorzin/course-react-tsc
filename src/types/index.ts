export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

export interface IPokemon {
  name: string;
  src: string;
  stats: Stat[];
}

interface Stat {
  base_stat: number;
  effort: number;
  stat: { name: string; url: string };
}

export enum Status {
  IDLE = 'idle',
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}
