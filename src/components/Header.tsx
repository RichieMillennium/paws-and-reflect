import React, {
  ChangeEvent,
  FunctionComponent,
  useContext,
  useState,
  useCallback
} from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import { styled, makeStyles } from '@material-ui/core/styles';

import { GlobalStateContext } from './GlobalStateContext';
import { setSelectedViewAction } from '../utils/globalStateReducer';

const DogsAppBar = styled(AppBar)({
  flexGrow: 1
});

const MenuButton = styled(Button)(({ theme }) => ({
  margin: '0 4px'
}));

const useStyles = makeStyles(theme => ({
  title: {},
  spacer: {
    flexGrow: 1
  }
}));

export const Header: FunctionComponent = () => {
  const { globalState, globalStateDispatch } = useContext(GlobalStateContext);
  const [searchText, setSearchText] = useState<string>('');
  const classes = useStyles();
  const { headerSearchHandler, selectedView } = globalState;

  const setSelectedView = useCallback(
    setSelectedViewAction(globalStateDispatch),
    [globalStateDispatch]
  );

  const handleSearchChange = (event: ChangeEvent) => {
    const searchChange: string = (event.target as any).value;
    setSearchText(searchChange);
    if (headerSearchHandler) {
      headerSearchHandler(searchChange);
    }
  };

  return (
    <DogsAppBar color="default">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Paws and Reflect
        </Typography>
        <div className={classes.spacer}></div>
        <div>
          {['Gallery', 'Picture Book'].map(option => (
            <MenuButton
              key={option}
              color="secondary"
              variant={option === selectedView ? 'contained' : 'outlined'}
              onClick={() => setSelectedView(option)}
            >
              {option}
            </MenuButton>
          ))}
        </div>
        <div className={classes.spacer}></div>
        <div>
          <TextField
            variant="outlined"
            placeholder="Search"
            value={searchText}
            onChange={handleSearchChange}
            disabled={!headerSearchHandler}
          />
        </div>
      </Toolbar>
    </DogsAppBar>
  );
};
