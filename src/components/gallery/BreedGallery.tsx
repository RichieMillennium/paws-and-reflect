import React, {
  FunctionComponent,
  useEffect,
  useContext,
  useReducer,
  useCallback,
  useRef,
  useState
} from 'react';
import { Grid, styled } from '@material-ui/core';

import { useDogs } from '../../utils/useDogs';
import { setHeaderSearchHandlerAction } from '../../utils/globalStateReducer';
import {
  dataViewStateReducer,
  DataViewStateReducer,
  initDataViewState,
  setOptionsAction,
  setPageAction
} from '../../utils/dataViewStateReducer';
import { GlobalStateContext } from '../GlobalStateContext';
import { BreedDetail } from './BreedDetail.model';
import { GalleryCard } from './GalleryCard';
import { GalleryPager } from './GalleryPager';
import { breedsAreDifferent, checkViewStateChange } from './helpers';

const GridOfCards = styled(Grid)({
  height: 'calc(100vh - 175px)',
  overflow: 'scroll'
});

const GALLERY_PAGE_SIZE = 6;

const initEvent = new Event('init event');

interface Options {
  breeds: string[];
}

export const BreedGallery: FunctionComponent = () => {
  const [breedDetails, setBreedDetails] = useState<BreedDetail[]>([]);
  const { breeds, totalBreeds, loadBreedImages, searchBreeds } = useDogs();
  const {
    globalStateDispatch,
    globalState: { isLoading }
  } = useContext(GlobalStateContext);
  const [
    { offset, take, options, dataViewChangedEvent },
    dataViewStateDispatch
  ] = useReducer<DataViewStateReducer<any, any, Options>>(
    dataViewStateReducer,
    initDataViewState(GALLERY_PAGE_SIZE, { breeds: [] })
  );
  const lastChangeEvent = useRef(initEvent);

  const setBreeds = useCallback(setOptionsAction(dataViewStateDispatch), [
    dataViewStateDispatch
  ]);
  useEffect(() => {
    setHeaderSearchHandlerAction(globalStateDispatch)(searchBreeds);
    return () => {
      setHeaderSearchHandlerAction(globalStateDispatch)(undefined);
    };
  }, [globalStateDispatch, searchBreeds]);

  useEffect(() => {
    const { newEvent, newOffset, newView } = checkViewStateChange(
      breeds,
      options.breeds,
      offset,
      take,
      isLoading,
      dataViewChangedEvent.timeStamp > lastChangeEvent.current.timeStamp
    );
    if (newEvent && newOffset !== undefined) {
      lastChangeEvent.current = newEvent;
      setPageAction(dataViewStateDispatch)({
        nativeEvent: lastChangeEvent.current,
        value: {
          offset: newOffset,
          take
        }
      });
    }
    if (newView) {
      setBreeds({
        nativeEvent: lastChangeEvent.current,
        value: {
          breeds: newView
        }
      });
    }
  }, [
    breeds,
    setBreeds,
    dataViewChangedEvent,
    isLoading,
    options,
    offset,
    take
  ]);

  useEffect(() => {
    if (
      options.breeds.length > 0 &&
      breedsAreDifferent(
        breedDetails.map(detail => detail.breed),
        options.breeds
      ) &&
      lastChangeEvent.current.timeStamp === dataViewChangedEvent.timeStamp &&
      !isLoading
    ) {
      lastChangeEvent.current = new Event('loading images');
      loadBreedImages(options.breeds).then(imageSets => {
        if (imageSets) {
          setBreedDetails(
            imageSets.map(({ breed, imageUrls }) => ({
              breed,
              imageUrls
            }))
          );
        }
      });
    }
  }, [
    options,
    loadBreedImages,
    breedDetails,
    setBreedDetails,
    isLoading,
    dataViewChangedEvent
  ]);

  const handlePage = (offset: number, take: number, nativeEvent: Event) => {
    setPageAction(dataViewStateDispatch)({
      nativeEvent,
      value: {
        offset,
        take
      }
    });
  };

  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="stretch"
      style={{ height: '100%' }}
    >
      <GridOfCards container item spacing={2}>
        {breedDetails.map(breedDetail => (
          <Grid item xs={4} key={breedDetail.breed}>
            <GalleryCard breedDetail={breedDetail} />
          </Grid>
        ))}
      </GridOfCards>
      <Grid container item spacing={2}>
        <Grid item xs={12}>
          <GalleryPager
            offset={offset}
            take={take}
            size={GALLERY_PAGE_SIZE}
            total={totalBreeds}
            onPageChange={handlePage}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
