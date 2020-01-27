import React, { FunctionComponent, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';

import { PhotoDimensions } from './PhotoDimensions.model';

interface IPhotoCloseUp {
  imageUrl: string;
  photoDimensions: PhotoDimensions;
  open: boolean;
  onClose: () => void;
}

export const PhotoCloseUp: FunctionComponent<IPhotoCloseUp> = ({
  imageUrl,
  photoDimensions = {},
  open,
  onClose
}) => {
  const [photoSize, setPhotoSize] = useState<'sm' | 'md' | 'lg' | undefined>();
  useEffect(() => {
    if (open && photoDimensions.width) {
      if (photoDimensions.width >= 960) {
        setPhotoSize('lg');
      } else if (photoDimensions.width >= 600) {
        setPhotoSize('md');
      } else if (photoDimensions.width >= 440) {
        setPhotoSize('sm');
      }
      console.log(`${photoDimensions?.width} by ${photoDimensions?.height}`);
    }
  }, [open, photoDimensions]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={!!photoSize}
      maxWidth={photoSize}
    >
      <DialogContent>
        <img src={imageUrl} alt="Dog" />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
