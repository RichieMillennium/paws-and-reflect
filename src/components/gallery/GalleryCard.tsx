import React, { FunctionComponent, useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  IconButton,
  styled
} from '@material-ui/core';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';

import { BreedDetail } from './BreedDetail.model';

const BreedCard = styled(Card)(({ theme }) => ({
  backgroundImage: `linear-gradient(${theme.palette.primary.light}, ${theme.palette.common.white})`,
  color: theme.palette.primary.contrastText
}));

const CardImage = styled(CardMedia)({
  height: 220
});

const CardTitle = styled(CardHeader)({ textTransform: 'capitalize' });

interface GalleryCardProps {
  breedDetail: BreedDetail;
}

export const GalleryCard: FunctionComponent<GalleryCardProps> = ({
  breedDetail
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handlePrevious = () => setSelectedIndex(selectedIndex - 1);
  const handleNext = () => setSelectedIndex(selectedIndex + 1);
  return (
    <BreedCard>
      <CardTitle title={breedDetail.breed} />
      <CardImage
        image={breedDetail.imageUrls[selectedIndex]}
        onError={err => console.log('ERR', err)}
      />
      <CardActions disableSpacing color="white">
        <IconButton
          size="small"
          onClick={handlePrevious}
          disabled={selectedIndex === 0}
        >
          <NavigateBefore />
        </IconButton>
        <IconButton
          size="small"
          onClick={handleNext}
          disabled={selectedIndex === breedDetail.imageUrls.length - 1}
        >
          <NavigateNext color="action" />
        </IconButton>
      </CardActions>
    </BreedCard>
  );
};
