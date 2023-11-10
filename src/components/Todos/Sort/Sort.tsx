import { FC, useId } from 'react';
import { InputLabel, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ISortProps {
  sort: string;
  onSelectChange: (e: SelectChangeEvent) => void;
}

const Sort: FC<ISortProps> = ({ sort, onSelectChange }) => {
  const id = useId();

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel id={id}>Sort</InputLabel>
      <Select labelId={id} label='Sort' value={sort} onChange={onSelectChange}>
        <MenuItem value=''>
          <em>Sort by</em>
        </MenuItem>
        <MenuItem value={'A-Z'}>A-Z</MenuItem>
        <MenuItem value={'Z-A'}>Z-A</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sort;
