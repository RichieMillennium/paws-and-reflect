import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState
} from 'react';
import { Grid, styled } from '@material-ui/core';

import { BreedList } from './BreedList';
import { BreedButton } from './BreedButton';
import { BreedPhotos } from './BreedPhotos';
import { GlobalStateContext } from '../GlobalStateContext';
import { useDogs } from '../../utils/useDogs';
import { setHeaderSearchHandlerAction } from '../../utils/globalStateReducer';

const Book = styled(props => <Grid container direction="row" {...props} />)({
  height: '100vh'
});

const BookSection = styled(props => <Grid item {...props} />)({
  height: '100vh',
  overflow: 'scroll'
});

export const PictureBook: FunctionComponent = () => {
  const [breedImageUrls, setBreedImageUrls] = useState<Array<string>>([]);
  const {
    searchBreeds,
    breeds,
    selectedBreed,
    setSelectedBreed,
    loadBreedImages
  } = useDogs();
  const { globalStateDispatch, globalState } = useContext(GlobalStateContext);

  useEffect(() => {
    setHeaderSearchHandlerAction(globalStateDispatch)(searchBreeds);
    return () => {
      setHeaderSearchHandlerAction(globalStateDispatch)(undefined);
    };
  }, [globalStateDispatch, searchBreeds]);

  // load the images for the breed the user has selected
  useEffect(() => {
    if (!selectedBreed || breedImageUrls.length > 0) {
      return;
    }
    loadBreedImages([selectedBreed])
      .then(imageSets => {
        if (!imageSets) {
          return;
        }
        const [imageSet] = imageSets;
        setBreedImageUrls(imageSet.imageUrls);
      })
      .catch(() => setSelectedBreed(''));
  }, [
    selectedBreed,
    setSelectedBreed,
    breedImageUrls,
    setBreedImageUrls,
    loadBreedImages
  ]);

  const handleBreedSelect = (value: string) => {
    setBreedImageUrls([]);
    setSelectedBreed(value);
  };

  return (
    <Book spacing={8}>
      <BookSection xs={2}>
        <BreedList matchesFound={!!breeds.length || globalState.isLoading}>
          {breeds.map(breed => (
            <BreedButton
              key={breed}
              breed={breed}
              selected={breed === selectedBreed}
              setSelectedBreed={handleBreedSelect}
            />
          ))}
        </BreedList>
      </BookSection>
      <BookSection xs={10}>
        <BreedPhotos open={!!selectedBreed} breedImageUrls={breedImageUrls} />
      </BookSection>
    </Book>
  );
};
