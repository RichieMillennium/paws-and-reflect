export const breedsAreDifferent = (left: string[], right: string[]) => {
  return (
    left.length !== right.length ||
    left.filter(item => !right.includes(item)).length > 0
  );
};

export const checkViewStateChange = (
  breedsDataSource: string[],
  breedsView: string[],
  offset: number,
  take: number,
  isLoading: boolean,
  changeEventIsNew: boolean
): { newEvent?: Event; newOffset?: number; newView?: string[] } => {
  const newView = breedsDataSource.slice(offset, offset + take);
  const breedsChanged = breedsAreDifferent(newView, breedsView);
  if (
    breedsDataSource.length > 0 &&
    !isLoading &&
    (breedsChanged || changeEventIsNew)
  ) {
    if (breedsChanged && !changeEventIsNew) {
      // breeds changed as a result of search, reset view state to page 1
      return {
        newEvent: new Event('breed search results'),
        newOffset: 0,
        newView: breedsDataSource.slice(0, take)
      };
    } else {
      // breeds changed as a result of the view state controls
      return {
        newView
      };
    }
  }

  return {};
};
