import React, { FunctionComponent, useContext } from 'react';
import { CircularProgress, Backdrop, styled } from '@material-ui/core';

import { GlobalStateContext } from './GlobalStateContext';

const LightBackdrop = styled(Backdrop)(({ theme }) => ({
  backgroundColor: theme.palette.grey.A200
}));

export const Loader: FunctionComponent = () => {
  const { globalState } = useContext(GlobalStateContext);
  return (
    <LightBackdrop open={globalState.isLoading} timeout={1000}>
      <CircularProgress color="secondary" variant="indeterminate" />
    </LightBackdrop>
  );
};
