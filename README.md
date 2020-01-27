This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# richard_vance_simspace_challenge_submission

## Design Decisions

- `@material-ui` was selected as the provider for the application's 
styling and component library.
- `axios` was selected for all API requests.
- The `useDogs` custom hook encapsulates all of the data fetching and
searching functionality.
- The application consists of 4 primary components:
  - `Header` - contains the title and search control
  - `Loader` - uses a spinner to indicate that requests are in progress
  - `BreedList` - shows the breeds that match the search criteria
  - `BreedPhotos` - shows the images for the currently selected breed

## Feedback for the Designers (quirks, improvements, etc.)

- We might consider replacing the loading spinners with skeleton placeholders,
such as `react-loading-skeleton` or the `Skeleton` component in the 
`@material-ui/lab` project.

## Possible design changes in the future

- Currently if the user deletes their search text after selecting a breed,
it is possible that the images currently being displayed belong to a breed 
name that is no longer being displayed in the list of 12. This may not be 
the desired result.
- The dog images are sometimes cropped by the `GridList` component. If the
image dimensions could be determined ahead of time, the `GridListTile`s
could span multiple columns to mitigate cropping.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
