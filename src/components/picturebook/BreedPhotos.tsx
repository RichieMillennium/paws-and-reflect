import React, { FunctionComponent, useContext, useState, useRef } from 'react';
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  makeStyles
} from '@material-ui/core';
import { ZoomIn } from '@material-ui/icons';

import { GlobalStateContext } from '../GlobalStateContext';
import { PhotoCloseUp } from './PhotoCloseUp';
import { PhotoDimensions } from './PhotoDimensions.model';

interface IBreedPhotos {
  open: boolean;
  breedImageUrls: string[];
}

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.common.white
  }
}));

export const BreedPhotos: FunctionComponent<IBreedPhotos> = ({
  open,
  breedImageUrls
}) => {
  const { globalState } = useContext(GlobalStateContext);
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const photoSizes = useRef<{
    [key: string]: PhotoDimensions;
  }>({});
  const classes = useStyles();
  const handleCloseCloseUp = () => setSelectedPhoto('');
  const handleOpenCloseUp = (photoUrl: string) => () =>
    setSelectedPhoto(photoUrl);
  const setPhotoSize = (image: any) => {
    photoSizes.current[image?.src] = {
      width: image?.naturalWidth,
      height: image?.naturalHeight
    };
  };
  return open && !globalState.isLoading ? (
    <GridList cols={4} cellHeight={200}>
      {breedImageUrls.map(url => (
        <GridListTile key={url}>
          <img
            src={url}
            alt="Dog"
            onLoad={event => setPhotoSize(event.target)}
          />
          <GridListTileBar
            actionIcon={
              <IconButton
                onClick={handleOpenCloseUp(url)}
                className={classes.icon}
              >
                <ZoomIn />
              </IconButton>
            }
          />
          <PhotoCloseUp
            imageUrl={url}
            photoDimensions={photoSizes.current[url]}
            open={selectedPhoto === url}
            onClose={handleCloseCloseUp}
          />
        </GridListTile>
      ))}
    </GridList>
  ) : (
    <div />
  );
};
