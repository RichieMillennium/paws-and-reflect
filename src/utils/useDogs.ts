import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
  SetStateAction,
  Dispatch
} from 'react';
import { CancelToken } from 'axios';

import { apiGet, getCancelTokenSource } from './api';
import {
  setIsLoadingAction,
  setAlertMessageAction
} from './globalStateReducer';
import { GlobalStateContext } from '../components/GlobalStateContext';

const ALL_DOGS_URL = 'https://dog.ceo/api/breeds/list/all';

const getBreedImagesUrl = (breed: string) =>
  `https://dog.ceo/api/breed/${breed}/images`;

interface IUseDogResults {
  searchBreeds: (searchText: string) => void;
  selectedBreed: string;
  setSelectedBreed: Dispatch<SetStateAction<string>>;
  breeds: string[];
  totalBreeds: number;
  loadBreedImages: (
    breeds: string[],
    cancelToken?: CancelToken
  ) => Promise<BreedImageSet[] | null>;
}

export interface BreedImageSet {
  breed: string;
  imageUrls: string[];
}

type UseDogsCustomHook = (breedSampleCount?: number) => IUseDogResults;

export const useDogs: UseDogsCustomHook = breedSampleCount => {
  const [breeds, setBreeds] = useState<Array<string>>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const allBreeds = useRef<string[]>([]);
  const {
    globalStateDispatch,
    globalState: { isLoading }
  } = useContext(GlobalStateContext);

  const setIsLoading = useCallback(setIsLoadingAction(globalStateDispatch), [
    globalStateDispatch
  ]);
  const setErrorMessage = useCallback(
    error =>
      setAlertMessageAction(globalStateDispatch)({
        severity: 'error',
        message: error
      }),
    [globalStateDispatch]
  );

  // load the list of dog breeds if it hasn't been loaded yet
  useEffect(() => {
    const cancelTokenSource = getCancelTokenSource();
    if (!allBreeds.current.length) {
      setIsLoading(true);
      apiGet(ALL_DOGS_URL, cancelTokenSource.token)
        .then(({ data }) => {
          if (data.status && data.status === 'success') {
            allBreeds.current = Object.keys(data.message).sort();
            setBreeds(allBreeds.current);
          } else {
            setErrorMessage('There was a problem trying to find the dogs.');
          }
        })
        .catch(() =>
          setErrorMessage('Error! The dog data could not be loaded.')
        )
        .finally(() => {
          setIsLoading(false);
        });
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [setBreeds, setIsLoading, setErrorMessage]);

  const loadBreedImages = useCallback(
    (
      breeds: string[],
      cancelToken?: CancelToken
    ): Promise<BreedImageSet[] | null> => {
      if (isLoading) {
        return Promise.resolve(null);
      }
      setIsLoading(true);
      return Promise.all<BreedImageSet>(
        breeds.map(breed => {
          return new Promise((resolve, reject) => {
            const url = getBreedImagesUrl(breed);
            apiGet(url, cancelToken)
              .then(({ data }) => {
                if (data.status && data.status === 'success') {
                  resolve({
                    breed,
                    imageUrls: data.message
                  });
                } else {
                  setErrorMessage(
                    'There was a problem trying to find the photos.'
                  );
                  resolve(undefined);
                }
              })
              .catch(err => {
                setErrorMessage(
                  'Error! The dog photo data could not be loaded.'
                );
                reject(err);
              });
          });
        })
      ).finally(() => setIsLoading(false));
    },
    [isLoading, setIsLoading, setErrorMessage]
  );

  // filter the list of dog breeds based on the user's search criteria
  const searchBreeds = useCallback(
    (searchText: string) => {
      if (allBreeds.current.length) {
        setIsLoading(true);
        setBreeds(
          allBreeds.current.filter(breed => breed.includes(searchText))
        );
        setIsLoading(false);
      }
    },
    [allBreeds, setIsLoading]
  );

  return {
    searchBreeds,
    selectedBreed,
    setSelectedBreed,
    breeds:
      breedSampleCount === undefined
        ? breeds
        : breeds.slice(0, breedSampleCount),
    totalBreeds: breeds.length,
    loadBreedImages
  };
};
