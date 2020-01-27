import React, { FunctionComponent } from 'react';
import { Grid, Typography, styled } from '@material-ui/core';

interface IBreedGrid {
  matchesFound: boolean;
}

const GridWrapper = styled(props => <div {...props}></div>)({
  root: {
    flexGrow: 1,
    marginBottom: 32
  }
});

export const BreedList: FunctionComponent<IBreedGrid> = ({
  matchesFound,
  children
}) => {
  return matchesFound ? (
    <GridWrapper>
      <Grid container spacing={4}>
        {children}
      </Grid>
    </GridWrapper>
  ) : (
    <div>
      <Typography variant="h3">No breed matches found.</Typography>
    </div>
  );
};
