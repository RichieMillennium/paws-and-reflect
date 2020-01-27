import React, { FunctionComponent, ChangeEvent } from 'react';
import { Grid, Container, Button, Slider, styled } from '@material-ui/core';
import { FastRewind, FastForward } from '@material-ui/icons';

interface GalleryPagerProps {
  offset: number;
  take: number;
  size: number;
  total: number;
  onPageChange: (offset: number, take: number, event: Event) => void;
}

const PagerButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2)
}));

export const GalleryPager: FunctionComponent<GalleryPagerProps> = ({
  offset,
  take,
  size,
  total,
  onPageChange
}) => {
  const page: number = offset / size + 1;
  const pages: number = Math.ceil(total / size);
  const handlePrevious = (event: Event) =>
    onPageChange(offset - size, take, event);
  const handleNext = (event: Event) => onPageChange(offset + size, take, event);
  const handlePage = (event: ChangeEvent<any>, value: number | number[]) =>
    onPageChange(((value as number) - 1) * size, take, event.nativeEvent);
  const marks: any[] = Array(pages)
    .fill({}, 0, pages)
    .map((mark, index) => ({ value: index + 1, label: `${index + 1}` }));
  return (
    <Container maxWidth="sm" style={{ marginTop: 16 }}>
      <Grid container spacing={4}>
        <Grid item xs={2}>
          <PagerButton
            size="small"
            variant="contained"
            color="secondary"
            disabled={offset === 0}
            onClick={e => handlePrevious(e.nativeEvent)}
          >
            <FastRewind />
          </PagerButton>
        </Grid>
        <Grid item xs={8}>
          {pages > 1 && (
            <Slider
              value={page}
              min={1}
              max={pages}
              marks={marks}
              onChange={handlePage}
            />
          )}
        </Grid>
        <Grid item xs={2}>
          <PagerButton
            size="small"
            variant="contained"
            color="secondary"
            disabled={page === pages}
            onClick={e => handleNext(e.nativeEvent)}
          >
            <FastForward />
          </PagerButton>
        </Grid>
      </Grid>
    </Container>
  );
};
