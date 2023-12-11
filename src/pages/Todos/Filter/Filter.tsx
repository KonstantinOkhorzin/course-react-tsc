import { FC, ChangeEvent } from 'react';
import { TextField } from '@mui/material';

interface IFilterProps {
  filter: string;
  onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Filter: FC<IFilterProps> = ({ filter, onFilterChange }) => {
  return (
    <>
      <TextField type='search' label='Filter by text task' value={filter} onChange={onFilterChange} />
    </>
  );
};

export default Filter;
