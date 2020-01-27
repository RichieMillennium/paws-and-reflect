import React, { FunctionComponent } from 'react';
import { styled } from '@material-ui/core';
import { ToggleButton } from '@material-ui/lab';

interface IBreedButton {
  breed: string;
  selected: boolean;
  setSelectedBreed: (value: string) => void;
}

const DogToggle = styled(ToggleButton)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: theme.spacing(1),
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

export const BreedButton: FunctionComponent<IBreedButton> = ({
  breed,
  selected,
  setSelectedBreed
}) => {
  const handleSelectionChange = (breed: string) => () =>
    setSelectedBreed(breed);

  return (
    <DogToggle
      value={breed}
      selected={selected}
      onChange={handleSelectionChange(breed)}
    >
      {breed}
    </DogToggle>
  );
};
