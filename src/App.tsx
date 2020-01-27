import React, {
  FunctionComponent,
  useReducer,
  useState,
  useEffect
} from 'react';
import {
  Container,
  styled,
  MuiThemeProvider,
  createMuiTheme,
  colors,
  Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { Header } from './components/Header';
import { Loader } from './components/Loader';
import { PictureBook } from './components/picturebook/PictureBook';
import { BreedGallery } from './components/gallery/BreedGallery';
import {
  GlobalStateContext,
  IGlobalStateContext
} from './components/GlobalStateContext';
import {
  globalStateReducer,
  GlobalState,
  setAlertMessageAction
} from './utils/globalStateReducer';

const theme = createMuiTheme({
  palette: {
    primary: colors.indigo,
    secondary: colors.orange
  }
});

const BodyContainer = styled(Container)({
  marginTop: 100,
  height: '100%'
});

const INITIAL_STATE: GlobalState = {
  isLoading: false,
  headerSearchHandler: undefined,
  selectedView: 'Gallery',
  alertMessage: undefined
};

const DEFAULT_MESSAGE_DURATION = 5000;

const App: FunctionComponent = () => {
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const [globalState, globalStateDispatch] = useReducer(
    globalStateReducer,
    INITIAL_STATE
  );
  const globalContext: IGlobalStateContext = {
    globalState,
    globalStateDispatch
  };
  const deleteAlertMessage = () =>
    setAlertMessageAction(globalStateDispatch)(undefined);
  const { selectedView, alertMessage } = globalState;

  useEffect(() => {
    if (alertMessage) {
      setAlertVisible(true);
    }
  }, [alertMessage]);

  const handleCloseMessage = () => {
    setAlertVisible(false);
    deleteAlertMessage();
  };

  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <GlobalStateContext.Provider value={globalContext}>
          <Header />
          <BodyContainer>
            <Loader />
            {selectedView === 'Picture Book' && <PictureBook />}
            {selectedView === 'Gallery' && <BreedGallery />}
          </BodyContainer>
        </GlobalStateContext.Provider>
      </MuiThemeProvider>
      <Snackbar
        open={alertVisible}
        autoHideDuration={DEFAULT_MESSAGE_DURATION}
        onClose={handleCloseMessage}
      >
        <Alert severity={alertMessage?.severity}>{alertMessage?.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default App;
