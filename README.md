# Project #3: LifeTracker Application

## Overview

> Data is the new oil - Clive Humbly

Everywhere around us is data waiting to be collected and utilized. In recent years, we've seen the rise of applications and services that exist to quantify concepts that were previously hard to capture. FitBit, Apple Health, and Woop are all $1 billion dollar services to offer tracking statistics about how we live our lives. The LifeTracker app you'll be building will do exactly that - track your life by quantifying your activity.

<a href="https://www.loom.com/share/d50955208ba94f7685cd99de73886ab7">
    <p>Library | Loom - 10 July 2023 - Watch Video</p>
    <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/d50955208ba94f7685cd99de73886ab7-1689016412059-with-play.gif">
  </a>

## Goals

By the end of this project you will be able to...

- [x] Develop a full-fledged authentication system using PostgreSQL and `bcrypt`
- [x] Provide users with an Express API they can interact with to store user-related activity
- [x] Construct multiple models that implement the core business logic associated with tracking users' lives
- [x] Write SQL queries that aggregate user statistics and provide summary overviews about their activity
- [x] Design a React frontend that interacts with the API using an API service class
- [x] Build multiple pages and forms that communicate with the server using HTTP requests
- [x] Employ `useEffect` and `useState` hooks to manage application state on the frontend
- [x] Store user-authenticated JWT tokens in the browser's local storage for persisted authentication

## Application Features

### Core Features

- [x] **The Landing Page:** Display a large hero image and a brief blurb on what this application is about. *Note:* This is the only page that unauthenticated users should be able to view.
- [x] **Registration Page:** A form that allows the user to sign up with their email, password, username, first name, and last name.
- [x] **Login Page:** A form that allows users to login with email and password.
- [x] When a user first authenticates, they should be redirected to an authenticated view (i.e., the detailed activity page). When they sign out, all frontend data should be reset.
- [x] **The Nav Bar:** Implement customized views for users who are logged in vs not logged in.
  - [x] If the user is logged in, it should display a **Sign Out** button.
  - [x] If no user is logged in, it should display **Login** and **Register** buttons.
  - [x] Display a logo on the far left side, and contain links to the individual detailed activity pages.
- [x] Users should have the ability to track at least **one** type of activity (i.e., nutrition, exercise, sleep, etc.). Each activity should be tracked on separate pages.
- [x] **Detailed Activity Page:** Display and enter activities.
  - [x] Display a feed of all previously tracked activities.
  - [x] A form to enter relevant information (i.e., if tracking nutrition, the user can enter calories, timestamp, image, category, etc.).
  - [x] Each activity tracked is given a unique ID for easy lookup.
- [x] Deploy your website with Render. Check out our [Render Deployment Guide](https://courses.codepath.org/snippets/site/render_deployment_guide) for detailed instructions.

### Stretch Features

Implement any of the following features to improve the application:

- [ ] Users have access to an overview Activity page that shows one summary statistic about each of the three types of activity tracked (i.e., total number of minutes exercised, average calories consumed, max hours of sleep in one night, etc.). These summary statistics should be created using the `AVG`, `SUM`, `COUNT`, `MIN`, `MAX`, functions in SQL queries and served from a dedicated API endpoint. *Note: Summary statistics should not be calculated on the frontend.*
- [ ] Each model (i.e `nutrition`, `exercise`, and `sleep`) should also implement a `fetchById` method that queries the database for a record by its id and only serves it to users who own that resource.
  - You should also create a new dynamic route on the frontend that displays detail about a single record. For instance, `nutrition/detail/:id` should show a page with all the information about a single nutrition item.
- [ ] Provide a dropdown that allows users to filter activity based on a certain attribute of any activity item. Example: filter exercise or nutrition by category, or filter sleep by the week/month it was recorded.
- [ ] Calculate aggregate statistics based on time periods - such as daily, weekly, monthly aggregates.
- [ ] Create a page that shows all other users that use the LifeTracker application and allow users to follow each other. You'll want to create a new table to store this data.
- [ ] Implement `security` middleware on the API that allows only authenticated users to access resources and allows users to only access resources about themselves.

### Building the app

#### The `App` Component

- [x] Build the `App` component to:
  - [x] Be wrapped by an element with the class name of `app`
  - [x] Contain the routes for the app
  - [x] Render the `Navbar` component on every route
  - [x] Render a `BrowserRouter` component that contains a `Routes` component with the following routes:
    - [x] `/` - Render the `Landing` component
    - [x] `/login` - Render the `LoginPage` component
    - [x] `/register` - Render the `RegistrationPage` component
    - [x] `/activity` - Render the `ActivityPage` component **only** if the user is logged in, otherwise it renders the `AccessForbidden` component
    - [x] `/nutrition/*` - Render the `NutritionPage`component **only** if the user is logged in, otherwise it renders the`AccessForbidden` component
    - [x] `*` - Anything else renders the `NotFound` component

#### Handling API Requests

- [x] Create a `constants.js` file at the root of the project that exports the following variables:
  - [x] `PRODUCTION_API_BASE_URL` - set to whatever URL the production API is deployed at
  - [x] `DEVELOPMENT_API_BASE_URL` - set to `"http://localhost:3001"` for development
  - [x] `API_BASE_URL` - If `process.env.NODE_ENV` is `production`, set this to `PRODUCTION_API_BASE_URL`, otherwise set it to `DEVELOPMENT_API_BASE_URL`
- [x] Create a `services` directory at the root of the project.
- [x] Inside the `services` directory, create an `apiClient.js` file
- [x] In the `apiClient.js` file, import the `axios` package and the `API_BASE_URL` constant from the `constants.js` file.
- [x] Define a new class in that file called `ApiClient`.
  - [x] Give it a constructor function that accepts a single parameter - `remoteHostUrl`. The constructor should attach the `remoteHostUrl` parameter to a new instance with `this.remoteHostUrl = remoteHostUrl`. It should also set `this.token = null`.
  - [x] Export default a new instance of the `ApiClient` class.
  - [x] Add an additional method called `setToken` that accepts a single parameter - `token` and attaches it to the instance.
  - [x] Create a utility method called `request` that uses `axios` to issue HTTP requests
  - [x] Add a `login` method that uses the `request` method to send an HTTP request to the `auth/login` endpoint
  - [x] Add a `signup` method that uses the `request` method to send an HTTP request to the `auth/register` endpoint
  - [x] Add a `fetchUserFromToken` method that uses the `request` method to send an HTTP request to the `auth/me` endpoint
  - [ ] **Add as many other methods as needed when making API requests.**

#### Manage Authentication State

Update the `App` component to manage authentication state:

- [x] Create a state variable called `appState` with a function called `setAppState` to update that state.
  - [x] Initialize `appState` with an object containing properties like `user`, `isAuthenticated`, `nutrition`, `sleep`, and `exercise`.
- [x] Implement a `useEffect` hook to fetch the user data.
  - [x] Define an asynchronous function named `fetchUser` to fetch the user data.
    - [x] Inside the `fetchUser` function, retrieve a token from `localStorage` using `localStorage.getItem("lifetracker_token")`
    - [x] Call the `setToken` function from the `apiClient.js` file.
    - [x] Make an API call to fetch user data using the `fetchUser` function from the `apiClient.js` file and extract the `data` from the response.
    - [x] If `data` is not null and not undefined, update the component's state using the `setAppState` function. Pass a callback to `setAppState` that takes the previous state and returns a new state object.
    - [x] In the callback, use the spread operator (`...`) to copy the previous state's properties to the new state object.
    - [x] Assign the following properties from the `data` object to the new state object:
      - [x] `user`
      - [x] `token`
    - [x] Assign at least **one** of the following properties from the `data` object to the new state object:
      - [x] `nutrition`
      - [x] `exercise`
      - [x] `sleep`
    - [x] Call the `setAppState` with a new state object to update the component's state.
    - [x] Outside the `fetchUser` function, call `fetchUser` to trigger the initial data fetch when the component mounts.
    - [x] The effect should be triggered whenever the value of `appState.isAuthenticated` changes.

#### Implement the `Loading` Component

- [x] Build the **`Loading`** component to:
  - [x] Render JSX that is wrapped by an element with the class name of `loading`
  - [x] Render an element with the class name of `loading-message` that contains the text `"Loading"`

#### Implement the `Navbar` Component

- [x] Build the **`Navbar`** component to:
  - [x] Render JSX that is wrapped by a `nav` element with the class name of `navbar`
  - [x] Render the app's logo as an element with the class name of `logo`.
    - [x] Inside that element should be a `Link` component from `react-router-dom` that navigates the user to the `/` route when clicked.
    - [x] Inside that `Link` component should be the application's logo (text or image).
  - [x] Render the `NavLinks.jsx` component with links to each of the resources and the `/activity` route.

#### Implement the `NavLinks` Component

- [x] Build the **`NavLinks`** component to:
  - [x] Render JSX that is wrapped by an element with the class name of `nav-links`
  - [x] Render a `Link` element from `react-router-dom` for:
    - [x] The `/activity` route with a label of `Activity`.
    - [x] The `/nutrition` route with a label of `Nutrition`.
    - [x] A route for any other resource page
  - [x] If a valid user is logged in, it should render an element with the class name of `logout-button` that calls the `logoutUser` function when clicked.
    - [x] The `logoutUser` function should remove the `lifetracker_token` from local storage and refresh the page so that all user data is reset.
  - [x] If no valid user is logged in:
    - [x] Render a `Link` element that redirects to the `/login` route with the label `Login`
    - [x] Render a `Link` element that redirects to the `/register` route with the label `Sign Up`

#### Implement the `LoginForm` Component

- [x] Build the **`LoginForm`** component to:
  - [x] Render JSX that is wrapped by an element with the class name of `login-form`
  - [x] Render an input element for the following fields:
    - [x] `email`
    - [x] `password`
  - [x] Each `input` element in the form should have a class name of `form-input` and should have the following props set:
    - [x] `name` - the `name` of the `input` field being rendered (`email`, `password`)
    - [x] `type` - the type of the `input` element (`text`, `email`, `number`, etc.)
    - [x] `value` - the current value of the `input` element
    - [x] `onChange` - the `onChange` handler function
  - [x] Validate the `email` field. If the user has entered text into the `email` field and it doesn't contain an `@` symbol, then an error message should be displayed in an element with the class name of `error` indicating that the entry is not a valid email.
  - [x] Gracefully handle errors:
    - [x] If the user has attempted to login and gotten a `401` error, then an error message should be displayed in an element with the class name of `error` indicating that the `email` and `password` combination is incorrect.
    - [x] If the user has attempted to login and gotten a `400` or `422` error, then an error message should be displayed in an element with the class name of `error` indicating what went wrong.
  - [x] There should be a `button` element with the class name of `submit-login`:
    - [x] It should contain the text `"Login"`
    - [x] When clicked, it should call the `loginUser` function

#### Implement the `LoginPage` Component

- [x] Build the **`LoginPage`** component to:
  - [x] Render JSX that is wrapped by an element with the class name of `login-page`
  - [x] Using either a custom hook, context, or manually set state, check to see if a user is already logged in
    - [x] If the user is already logged in, redirect them to the `/activity` page.
    - [x] If no user is authenticated, render the `LoginForm` component and pass it any props it needs.

#### Implement the `RegistrationForm` Component

- [x] Build the **`RegistrationForm`** component to:
  - [x] Render JSX that is wrapped by an element with the class name of `registration-form`
  - [x] Should render an input element for the following fields:
    - [x] `email`
    - [x] `username`
    - [x] `firstName`
    - [x] `lastName`
    - [x] `password`
    - [x] `passwordConfirm`
  - [x] Each `input` element in the form should have a class name of `form-input` and should have the following props set:
    - [x] `name` - the `name` of the `input` field being rendered (`email`, `username`, `firstName`, `lastName`, `password`, `passwordConfirm`)
    - [x] `type` - the type of the `input` element (`text`, `email`, `number`, etc.)
    - [x] `value` - the current value of the `input` element
    - [x] `onChange` - the `onChange` handler function
  - [x] Validate the `email` field: If the user has entered text into the `email` field and it doesn't contain an `@` symbol, then an error message should be displayed in an element with the class name of `error` indicating that the entry is not a valid email.
  - [x] Validate the `password` and `passwordConfirm` fields: If the user has entered text into the `password` and `passwordConfirm` fields and they don't match, then a message should be displayed in an element with the `className` of `error` with a message that contains the text: `passwords don't match`
  - [x] Gracefully handle errors:
    - [x] If the user has attempted to login and gotten a `401` error, then the `errors` object should contain a `form` property that contains a message indicating that the `email` and `password` combination is incorrect.
    - [x] If the user has attempted to login and gotten a `400` or `422` error, then the `errors` object should contain a `form` property that contains a message indicating what went wrong.
  - [x] There should be a `button` element with the `className` of `submit-registration`:
    - [x] It should contain the text `"Create Account"`
    - [x] When clicked, it should call the `signupUser` function

#### Implement the `RegistrationPage` component

- [x] Build the **`RegistrationPage`** component to:
  - [x] Render JSX that is wrapped by an element with the class name of `registration-page`
  - [x] Using either a custom hook, context, or manually handled state, check to see if a user is already logged in
    - [x] If the user is already logged in, it should redirect them to the `/activity` page
    - [x] If no user is authenticated, it should render the `RegistrationForm` component and pass it any props it needs

#### Implement the `LandingPage` Component

- [x] Build the **`LandingPage`** component to:
  - [x] Render JSX that is wrapped by an element with the class name of `landing-page`
  - [x] Render an element with the class name of `hero`
    - [x] Inside it, display a large hero image using an `img` element with the class name of `hero-img`
    - [x] Render a brief blurb on what this application is about inside an element with the class name of `cta`
  - [x] Allow unauthenticated access

#### Implement the `ActivityPage` Component

- [x] Build the **`ActivityPage`** component to:
  - [x] Render JSX that is wrapped by an element with the class name of `activity-page`
  - [x] Take the `appState` and `setAppState` as props and extract all the necessary data from it.
  - [x] If the `isProcessing` flag is `true`, it should render the `Loading` component.
  - [x] If the `isProcessing` flag is `false`, it should render the `ActivityFeed` component and pass it the appropriate props.

#### Implement the `ActivityFeed` Component

- [x] Build the **`ActivityFeed`** component to:
  - [x] Render JSX that is wrapped by an element with the class name of `activity-feed`
  - [] Accept **at least** the following props:
    - [] `totalCaloriesPerDay` - an array of items containing summary data about the total calories consumed per day
    - [] `avgCaloriesPerCategory` - an array of items containing summary data about the average calories consumed per category
    - [] Any other props as needed
  - [] Inside an element with the class name of `per-category`, it should:
    - [] Render the text: `"Average Calories Per Category` inside an `h4` element
    - [] Take the first `6` or less items in the `avgCaloriesPerCategory` array and render a `SummaryStat` component for each item.
      - [ ] Pass the calories **rounded down to one decimal place** as the `stat` prop
      - [ ] Pass the string of `calories` as the `label` prop
      - [ ] Pass the `category` as the `substat` prop
  - [ ] Inside an element with the class name of `per-day`, it should:
    - [ ] Render the text: `"Total Calories Per Day` inside an `h4` element
    - [ ] For each item in the `totalCaloriesPerDay` array, render a `SummaryStat` component.
      - [ ] Pass the calories **rounded down to the nearest whole number** as the `stat` prop
      - [ ] Pass the string of `calories` as the `label` prop
      - [x] Pass the `date` in the format `dd/mm/yyyy` - example: `07/02/2022` - as the `substat` prop

#### Implement the `SummaryStat` Component

- [ ] Build the **`SummaryStat`** component to:
  - [ ] Render JSX that is wrapped by an element with the class name of `summary-stat`
  - [ ] Accept **at least** the following props:
    - [ ] `stat` - the primary statistic to display
    - [ ] `label` - the unit label assigned to the statistic
    - [ ] `substat` - a secondary statistic related to the primary statistic
  - [ ] Render the `stat` prop inside an element with the class name of `primary-statistic`
  - [ ] Render the `label` prop inside an element with the class name of `stat-label`
  - [ ] Render the `substat` prop inside an element with the class name of `secondary-statistic`

#### Implement the `NutritionPage` Component

- [x] Build the **`NutritionPage`** component to:
  - [x] Render JSX that is wrapped by an element with the class name of `nutrition-page`
  - [x] Take the `appState` and `setAppState` as props and extract all the necessary data from it.
  - [x] Render a nested `Routes` component from `react-router-dom`.
    - [x] There should be multiple `Route` components:
      - [x] The `/nutrition` route should render the `NutritionOverview` component
      - [x] The `/nutrition/create` route should render the `NutritionNew` component
      - [x] The `/nutrition/id/:nutritionId` should render the `NutritionDetail` component
      - [x] Any other route should render the `NotFound` component

#### Implement the `NutritionOverview` Component

- [x] Build the **`NutritionOverview`** component to:
  - [x] Render JSX that is wrapped by an element with the class name of `nutrition-overview`
  - [x] Take the `appState` and `setAppState` as props and extract all the necessary data from it.
    - [x] If the `error` state variable has a valid string in it, it should render the `error` message inside an element with the class name of `error`
    - [x] If `isLoading` is `true`, it should render the `Loading` component
    - [x] If `isLoading` is `false`, it should render the `NutritionFeed` component and pass it the appropriate props
  - [x] Near the top of the component, it should render a `Link` component that directs to the `/nutrition/create` route and contains the text: `"Record Nutrition"`

#### Implement the `NutritionFeed` Component

- [x] Build the **`NutritionFeed`** component to:
  - [x] Render JSX that is wrapped by an element with the class name of `nutrition-feed`
  - [x] Receive **at least** the following props:
    - [x] `nutritions` - an array of `nutrition` items
  - [x] If the `nutritions` array has no items in it, render an empty message that says `Nothing here yet` inside an element with the class name of `empty-message`
  - [x] If the `nutritions` array does have items in it:
    - [x] For each item in the `nutritions` array, it should render a `NutritionCard` component

#### Implement the `NutritionNew` Component

- [x] Build the **`NutritionNew`** component to:
  - [x] Render JSX that is wrapped by an element with the class name of `nutrition-new`
  - [x] Render the `NutritionForm` component and pass it the appropriate props

#### Implement the `NutritionForm` Component

- [x] Build the **`NutritionForm`** component to:
  - [x] Render JSX that is wrapped by an element with the class name of `nutrition-form`
  - [x] Render an input element for the following fields:
    - [x] `name` - name of the nutrition item (defaults to an empty string)
    - [x] `calories` - number of calories in the nutrition item (defaults to 1)
    - [x] `imageUrl` - the `url` of an image to show for this nutrition item (defaults to an empty string)
    - [x] `category` - the category that this nutrition item belongs to, like fruit, meat, soda, snack, nuts, etc. (defaults to an empty string)
  - [x] Each `input` element in the form should have a class name of `form-input` and should have the following props set:
    - [x] `name` - the `name` of the `input` field being rendered (`name`, `calories`, `imageUrl`, `category`)
    - [x] `type` - the type of the `input` element (`text`, `email`, `number`, etc.)
    - [x] `value` - the current value of the `input` element
    - [x] `onChange` - the `onChange` handler function
  - [x] Gracefully handle errors:
    - [x] If any of the required fields are left blank, there should be an error message inside of an element with the class name of `error` indicating which fields are required.
    - [x] If the user has attempted to create a nutrition entry and gotten a `400` or `422` error, then that message should be displayed inside an element with the class name of `error`
  - [x] There should be a `button` element with the class name of `submit-nutrition`:
    - [x] Contain the text `"Save"`
    - [x] When clicked, it should call a function that creates a new nutrition entry
  - [x] After the form has been successfully submitted:
    - [x] Ensure that the new nutrition entry is stored in the `nutrition` context's `nutritions` array and is displayed in the `NutritionFeed` component
    - [ ] Fetch the `activity` data again so that new summary stats will be calculated

#### Implement the `NutritionDetail` Component

- [x] Build the **`NutritionDetail.jsx`** component to:
  - [x] Render JSX that is wrapped by an element with the class name of `nutrition-detail`
  - [x] Leverage the `useParams` hook from `react-router-dom` to extract the `nutritionId` param from the URL
  - [x] When the component is mounted to the screen...
    - [x] It should make a `GET` request to the `/nutrition/:nutritionId` endpoint with the `axios.get` method.
    - [x] The `:nutritionId` part of the request should be replaced with the `nutritionId` pulled from the URL.
    - [x] When the initial request is loading, it should render an `h1` element with the class name of `loading` and contain the text `"Loading..."`
    - [x] Store the `nutrition` received by the request in state and then render a `NutritionCard` component for that nutrition.
    - [x] If no `nutrition` is found with that `id`, it should render the `NotFound` component

#### Implement the `NutritionCard` Component

- [x] Build the **`NutritionCard`** component to:
  - [x] Render JSX that is wrapped by an element with the class name of `nutrition-card`
  - [x] Accept **at least** the following props:
    - [x] `nutrition` - should be a nutrition entry object containing the following attributes:
      - [x] `imageUrl` - (not required)
      - [x] `name` - (required)
      - [x] `calories` - (required)
      - [x] `category` - (required)
      - [x] `createdAt` - (required)
  - [x] Render the `name` of the `nutrition` entry inside an element with the class name of `nutrition-name`
  - [x] If the `nutrition` entry has a valid `imageUrl` attribute, render an `img` element with the class name of `nutrition-image` and use that `imageUrl` as its `src`
  - [x] Render the `calories` attribute of the `nutrition` entry inside an element with the class name of `nutrition-calories`
  - [x] Render the `category` attribute of the `nutrition` entry inside an element with the class name of `nutrition-category`
  - [x] Render the `createdAt` attribute of the `nutrition` entry in the format `dd/mm/yyyy` - example: `07/02/2022` - inside an element with the class name of `nutrition-date`.

  - [ ] **DO THE SAME FOR ANY OTHER RESOURCE THAT IS IN THE APPLICATION**
    - [ ] Choose whatever resources you want!

#### Implement the `ProtectedRoute` Component

- [x] Build the **`ProtectedRoute`** component to:
  - [x] Take the `appState` and `setAppState` as props and extract all the necessary data from it.
  - [x] Accept a component as the `element` prop and render that component.
  - [x] If the application isn't currently loading and no user is found, render the `LoginPage` component instead of rendering the route the user intended to go to. This way, we can ensure that only authenticated users can access the provided component.
  - [x] Any unauthenticated user should be shown the `LoginPage` component with a message indicating that they need to authenticate first
  - [x] Update the `LoginPage` component so that it accepts a `message` prop that is displayed in the login form - if it exists.
  - [x] Make sure to protect the entire `ActivityPage` component route and the `NutritionPage` component route (along with any other private resource pages). Don't protect the `LandingPage` component or the `LoginPage` and `RegistrationPage` components, as they should be public.

### API

Here are the pieces of functionality that should be built out for the backend:

- [x] **Project setup**
  - [x] First things first, bootstrap the Express application with some essential files and starter code
  - [x] Create a `.gitignore` file, an `app.js` file, an `app.test.js` file, and a `server.js` file
  - [x] Make sure `node_modules` are added to the `.gitignore` file.
  - [x] Add dependencies for `express@next`, `morgan`, `cors`, and `nodemon`
  - [x] Install new dependencies for `bcrypt`, `jsonwebtoken`, `colors`, `dotenv`, `pg`
  - [x] Commit all work to `git`
  - [x] Add a `.env` file to the root of the repo and include the following environment variables
    - [x] `PORT` (default to `3001`)
    - [x] `SECRET_KEY` (set to a long random string)
    - [x] `BCRYPT_WORK_FACTOR` (set to `13`)
    - [x] `DATABASE_USER`
    - [x] `DATABASE_PASS`
    - [x] `DATABASE_HOST`
    - [x] `DATABASE_PORT`
    - [x] `DATABASE_NAME` - (set to `lifetracker`)
    - [x] `DATABASE_TEST_NAME` - (set to `lifetracker_test`)
  - [x] Add a `config.test.js` file
    - [x] Write tests that check to make sure that:
      - [x] `process.env.NODE_ENV` is set to `test` when the test suite is run
      - [x] There is an `IS_TESTING` variable that is exported, which should only be true if `process.env.NODE_ENV` is set to `test`
    - [x] Write tests to ensure that certain environment variables are exported from the `config.js` file and can be imported:
      - [x] `PORT`
      - [x] `SECRET_KEY`
      - [x] `BCRYPT_WORK_FACTOR`
      - [x] `IS_TESTING`
    - [x] Write tests to ensure that a `getDatabaseUri` function is exported from the `config.js` file
      - [x] The `getDatabaseUri` function should:
        - [x] Check to see if a valid `process.env.DATABASE_URL` environment variable exists, and return that if it does.
        - [x] When `IS_TESTING` is `true`, the `getDatabaseUri` function should use the test database
        - [x] Otherwise, it should combine the proper database environment variables into a database connection string if no `process.env.DATABASE_URL` environment variable exists
  - [x] Add a `config.js` file
    - [x] Use the `dotenv` package to parse the environment variables from the `.env` file.
    - [x] Export each of the environment variables from the `config.js` file until the tests pass
    - [x] Write a `getDatabaseUri` function so that all the tests pass
  - [x] Commit all work to `git`
  - [x] The project should now be ready to go!
- [x] **PostgreSQL database**
  - Time bring in a PostgreSQL database client as the application's persistence layer
  - Make sure the PostgreSQL server is running
  - Create two files at the root of the project:
    - [x] `lifetracker-schema.sql`
      - [x] This script should:
        - [x] Create a `users` table with the following columns:
          - [x] `id`
          - [x] `username`
          - [x] `password`
          - [x] `first_name`
          - [x] `last_name`
          - [x] `email`
          - [x] `created_at`
          - [x] `updated_at`
        - [x] Create a `nutrition` table with the following columns:
          - [x] `id`
          - [x] `name`
          - [x] `category`
          - [x] `calories`
          - [x] `image_url`
          - [x] `user_id`
          - [x] `created_at`
        - [x] **Any other tables** that the application might depend on
    - [x] `lifetracker.sql`
      - [x] This script should:
        - [x] 1. Let the user know that they're about to delete the `lifetracker` database and prompt them to confirm that is what they want.
        - [x] 2. Drop the `lifetracker` database and then create a new `lifetracker` database, before connecting to the `lifetracker` database.
        - [x] 3. It should then run the `lifetracker-schema.sql` file.
        - [x] Follow the exact same steps for `1`, `2`, and `3`, but with the `lifetracker_test` database.
  - [x] Setup the database by running `psql -f lifetracker.sql`
  - [x] Create a new file at the root of the project called `db.js`. In that file:
    - [x] Import the `getDatabaseUri` function from the `config.js` file.
    - [x] Initialize a new PostgreSQL client with the `pg` package and connect to PostgreSQL using any necessary config variables.
    - [x] Connect to PostgreSQL and log a message to the terminal on success or failure.
    - [x] Export the connected database client
  - [x] Commit all work to `git`
  - [x] A database client is now ready to be used!
- [ ] **Server**
  - [x] Build out a bare-bones Express server with a health check route and an adequate middleware pipeline.
  - [x] Create a `utils` directory
    - [x] In the `utils` directory, create an `errors.js` file.
    - [x] Create error classes inside the file that will be used throughout the app.
  - [x] In the `app.test.js` file, write tests that:
    - [x] Ensure that the Express application responds to `GET` requests to the `/` route with a JSON object of `{ "ping": "pong" }`
    - [x] Check that middleware like `morgan` and `cors` exist, along with the JSON `body-parser` middleware from `express`
    - [x] Include an `afterAll` hook that calls `await db.end()` so that any open database connections close when all the tests are finished.
  - [x] Add code to the `app.js` and `server.js` file to get a simple server running along with responding to `GET` requests to the `/` route
  - [x] Create error classes inside the `utils/errors.js` file.
  - [x] Add `404` and generic error handler middleware to the `app.js` file.
  - [x] In the `server.js` file:
    - [x] Import the Express app and the `config.js` file
    - [x] Have the `app` listen on the port specified by `config.PORT`.
  - [x] Commit all work to `git`
  - [x] Test out the fancy new Express server by starting it up in a new terminal window!
- [x] **Common Test Configuration**
  - [x] It would probably be helpful to create some common test functions that can be used throughout the application's testing suite.
  - [x] Create a new directory called `tests`
  - [x] Now, touch a new file at `tests/common.js`
    - [x] In that file:
      - [x] Import the `db` client
      - [x] Create and export four functions:
        - [x] `commonBeforeAll`
          - [x] Actions that should happen before any tests in a particular file run.
          - [x] This should include things like executing queries that delete all items from any tables in the test database that might have been added during testing
        - [x] `commonBeforeEach`
          - [x] Actions that should happen before any **single** test in a particular file runs.
          - [x] This should include things like starting a database transaction
        - [x] `commonAfterEach`
          - [x] Actions that should happen after any **single** test in a particular file runs.
          - [x] This should include things like rolling back any database actions before they're committed
        - [x] `commonAfterAll`
          - [x] Actions that should occur after all tests in a particular file run.
          - [x] This should include things like ending any open database client connections
  - [x] Commit all work to `git`
- [x] **Authentication**
  - [x] Go ahead and build out a full-fledged authentication flow using PostgreSQL, `bcrypt`, and JSON Web Tokens. For it all to work, we'll need a `User` model, a `security` middleware, some `tokens` utility functions, and the appropriate `auth` routes.
  - [x] Add new directories for `models`, `routes`, and `middleware`
  - [x] The **User** model
    - [x] In the `models` directory, create two new files: `models/user.js` and `models/user.test.js`
      - [x] The `User` model should have **at least** the following static methods:
        - [x] `login`
        - [x] `register`
        - [x] `fetchUserByEmail`
    - [x] In the `models/user.test.js` file:
      - [x] Test the `login` method. Write test cases for:
        - [x] User can login successfully with proper credentials
        - [x] Unknown email throws `UnauthorizedError`
        - [x] Invalid credentials throws `UnauthorizedError`
      - [x] Test the `register` method. Write test cases for:
        - [x] User can successfully register with proper credentials
        - [x] Registering with duplicate email throws `BadRequestError`
        - [x] Registering with duplicate username throws `BadRequestError`
        - [x] Registering with invalid email throws `BadRequestError`
      - [x] Test the `fetchUserByEmail` method:. Write test cases for:
        - [x] A valid email returns a user from the database
        - [x] Invalid emails are handled correctly
      - [x] It will probably be important to use the `beforeAll`, `afterAll`, `beforeEach`, and `afterEach` hooks to add and delete users from the database before running the tests
    - [x] In the `models/user.js` file:
      - [x] Import the `bcrypt` package, the `db` client, and the app `config`.
      - [x] Implement the features outlined in the tests until they're all passing.
  - [x] Commit all work to `git`
  - [x] The **tokens** utility functions
    - [x] In the `utils` directory, create two new files: `utils/tokens.js` and `utils/tokens.test.js`
      - [x] At the bare minimum, two functions will be needed:
        - [x] One that accepts a JSON payload as an argument and converts it into a JWT
        - [x] One that accepts a JWT as an argument, validates it, and returns the JSON payload encoded within - if it's valid
    - [x] In the `utils/tokens.test.js` file:
      - [x] Write test cases for:
        - [x] Can create valid JWT tokens for user payloads
        - [x] Can extract a payload from a valid JWT with the correct secret
        - [x] No payload gets returned when invalid tokens are parsed
    - [x] In the `utils/tokens.js` file:
      - [x] Implement the features outlined in the tests until they're all passing
  - [x] Commit all work to `git`
  - [ ] The **security** middleware
    - [ ] In the `middleware` directory, create two new files: `middleware/security.js` and `middleware/security.test.js`
      - [ ] One middleware will be responsible for extracting a user from a valid JWT in the request:
        - [ ] Checking the `Authentication` header of each request for the existence of a JWT.
        - [ ] If one exists, it should extract the token, validate it, extract the encoded JSON payload, and attach it to the response's `locals` property
      - [ ] One middleware will be responsible for ensuring that an authenticated user exists:
        - [ ] Checking that a valid user exists on the response's `locals` property
        - [ ] If one does, the middleware should simply call next
        - [ ] If no valid user exists, it should throw an `UnauthorizedError`
    - [ ] In the `middleware/security.test.js` file:
      - [ ] Test the `Authentication` header parsing middleware
        - [ ] Write test cases for:
          - [ ] Extracts user from valid JWT in `Authentication` header
          - [ ] No user is stored when no valid JWT exists in the `Authentication` header
          - [ ] No user is stored when an invalid JWT is in the `Authentication` header
      - [ ] Test the middleware that ensures an authenticated user exists
        - [ ] Write test cases for:
          - [ ] Doesn't throw an error when a valid user is present
          - [ ] Throws an `UnauthorizedError` when no valid user is present
    - [ ] In the `middleware/security.js` file:
      - [ ] Implement the features outlined in the tests until they're all passing
    - [ ] In the `app.js` file, add the `Authentication` header parsing middleware to the Express app's middleware pipeline
  - [ ] Commit all work to `git`
  - [x] The **/auth** routes
    - [x] In the `routes` directory, create two new files: `routes/auth.js` and `routes/auth.test.js`
      - [x] A new Express router should be created. It should handle:
        - [x] A `GET` request to the `/me` endpoint
          - [x] It should send a JSON response back to the client with the user info like so: `{ "user": { "email": "user@gmail.com", ... } }`
        - [x] A `POST` request to the `/login` endpoint
          - [x] It should accept a request body with `email` and `password` keys
          - [x] It should send a JSON response back to the client with a new JWT and user info like so: `{ "token": "e2c2...", "user": { "email": "user@gmail.com", ... } }`
        - [x] A `POST` request to the `/register` endpoint
          - [x] It should accept a request body with `email`, `username`, `firstName`, `lastName`, and `password` keys
          - [x] It should send a JSON response back to the client with a `201` status code, along with a new JWT and user info like so: `{ "token": "e2c2...", "user": { "email": "user@gmail.com", ... } }`
      - [x] It should be mounted at the `/auth` endpoint in the `app.js` file
    - [x] In the `routes/auth.test.js` file:
      - [x] Test the `POST /auth/login` endpoint
        - [x] Write test cases for:
          - [x] Allows user to register with valid credentials and responds with JSON containing a valid token and user in the "token" and "user" fields
          - [x] Throws `UnauthorizedError` when user doesn't exist in database
          - [x] Throws `UnauthorizedError` when user provides wrong password
          - [x] Throws `BadRequestError` when user doesn't provide password
          - [x] Throws `BadRequestError` when user doesn't provide email
      - [x] Test the `POST /auth/register` endpoint
        - [x] Write test cases for:
          - [x] Allows user to login successfully with valid credentials and responds with a `201` status code, along with JSON containing a valid token and user in the "token" and "user" fields
          - [x] Throws `BadRequestError` when user doesn't provide one of the required fields
          - [x] Throws `BadRequestError` when user provides email that already exists
          - [x] Throws `BadRequestError` when user provides username that already exists
      - [x] Test the `POST /auth/me` endpoint
        - [x] Write test cases for:
          - [x] Provides the user with their user info when a valid JWT is present in the `Authentication` header of the request
          - [x] Throws an `UnauthorizedError` when no valid user is logged in
    - [x] In the `routes/auth.js` file:
      - [x] Create a new Express router
      - [x] Implement the features outlined in the tests until they're all passing
    - [x] In the `app.js` file:
    - [x] Mount the router at the `/auth` endpoint
  - [x] Commit all work to `git`
  - [x] There should now be a full-fledged authentication system in place!
- [x] **Resources and Permissions**
  - [ ] Next, implement the functionality to allow users to save instances of things they've drank/eaten, so that they can track their own nutrition data! Also make sure users can only access the data that they themselves have created. No other user should be able to see any data owned by another user!
  - [x] The **Nutrition** model
    - [x] In the `models` directory, create two new files: `models/nutrition.js` and `models/nutrition.test.js`
      - [x] The `Nutrition` model should have **at least** the following static methods:
        - [x] `createNutrition`
          - [x] Should insert a new nutrition instance into the database when values are supplied for all of the required fields: `"name"`, `"category"`, `"calories"`, and `"image_url"`. The `quantity` field should default to `1`.
          - [x] The new nutrition instance should have its `user_id` field set to the `id` of the authenticated user
          - [x] Should throw a `BadRequestError` (`400` status code) or `UnprocessableEntityError` (`422` status code) when any of those values are not supplied.
        - [x] `fetchNutritionById`
          - [x] When supplied with a valid `id`, fetches the a nutrition instance from the database that matches that `id`.
          - [x] If no nutrition instance matches that `id`, throws a `NotFoundError` (`404` status code)
        - [x] `listNutritionForUser`
          - [x] Should list all nutrition instances in the database that are owned by a particular user
    - [x] In the `models/nutrition.test.js` file:
      - [x] Test the `createNutrition` method. Write test cases for:
        - [x] A user can create a nutrition instance when they supply the appropriate values
        - [x] The appropriate error is thrown when any of the provided errors are invalid
        - [x] The user that creates the nutrition instance now owns that nutrition instance
      - [x] Test the `fetchNutritionById` method. Write test cases for:
        - [x] Fetches the nutrition instance that matches the supplied `id`
        - [x] Throws a `NotFoundError` when no nutrition instances matches the supplied `id`
      - [x] Test the `listNutritionForUser` method. Write test cases for:
        - [x] Fetches all nutrition instances belonging to a particular user
        - [x] Doesn't include any nutrition instances belonging to a different user
        - [x] Returns an empty array if no nutrition instances are found in the database that belong to that user
    - [x] In the `models/nutrition.js` file:
      - [x] Implement the features outlined in the tests until they're all passing
    - [x] Commit all work to `git`
  - [ ] The **permissions** middleware
    - [ ] In the `middleware` directory, create two new files: `middleware/permissions.js` and `middleware/permissions.test.js`
      - [ ] Though more functions will need to be added here as the number of resources grows, for now only 1 function needs to be created.
      - [ ] The `authedUserOwnsNutrition` middleware function should:
        - [ ] Probably be called after the `requireAuthenticatedUser` security middleware in any route's middleware pipeline
        - [ ] Extract a parameter from the request endpoint that corresponds to the `id` of the nutrition instance
        - [ ] Query the database for that nutrition instance
        - [ ] Check that it is owned by the authenticated user
          - [ ] If it doesn't, it should throw a `ForbiddenError` (`403` status code)
          - [ ] If the nutrition instance does belong to the authenticated user, it should attach it to the `locals` property of the `response` as its `nutrition` property so that it doesn't need to be fetched again by the database (this isn't required, but is probably a good idea).
    - [ ] In the `middleware/permissions.test.js` file:
      - [ ] Test the `authedUserOwnsNutrition` middleware function
        - [ ] Write test cases for:
          - [ ] Throws error if authenticated user doesn't own nutrition
          - [ ] Throws `NotFoundError` if `id` of nutrition isn't found in database
          - [ ] Doesn't throw error if authenticated user is nutrition owner
          - [ ] (OPTIONAL) Attaches the `nutrition` to the `locals` property of the response when the user owns the nutrition instance
    - [ ] In the `middleware/permissions.js` file:
      - [ ] Implement the features outlined in the tests until they're all passing
    - [ ] Commit all work to `git`
  - [x] The **/nutrition** routes
    - [x] In the `routes` directory, create two new files: `routes/nutrition.js` and `routes/nutrition.test.js`
      - [x] A new Express router should be created that will be mounted at the `/nutrition` endpoint. It should handle:
        - [x] `GET` requests to the `/` endpoint
          - [x] It should send a JSON response back to the client with all of the user-owned nutrition instances in an array like so: `{ "nutritions": [...] }`
        - [x] `POST` requests to the `/` endpoint
          - [x] It should accept a request body with one `nutrition` key containing an object with all the attributes of the `nutrition` entry
          - [x] It should send a JSON response back to the client with a `201` status code, and the newly created nutrition instance like so: `{ "nutrition": { ... } }`
        - [x] `GET` requests to the `/:nutritionId` endpoint
          - [x] It should send a JSON response back to the client with the nutrition instance that matches the `:nutritionId` parameter like so: `{ "nutrition": { ... } }`
    - [x] In the `routes/nutrition.test.js` file:
      - [x] Test the `GET /nutrition` endpoint
        - [x] Write test cases for:
          - [x] Returns an array of all `nutrition` entries belonging to the user
          - [x] Other user's entries aren't included in the `nutritions` array
          - [x] Throws `UnauthorizedError` if no valid user is logged in
      - [x] Test the `POST /nutrition` endpoint
        - [x] Write test cases for:
          - [x] Authenticated users can create a new `nutrition` entry when providing values for all the required fields
          - [x] The new `nutrition` entry belongs to the user that created it
          - [x] Throws a `BadRequestError` if any of the required fields are missing
          - [x] Throws an `UnauthorizedError` if no valid user is logged in
      - [x] Test the `GET /nutrition/:nutritionId` endpoint
        - [x] Write test cases for:
          - [x] Nutrition owner can fetch a `nutrition` entry when providing a valid `id`
          - [x] Throws a `403 ForbiddenError` if a user tries to access a `nutrition` instance that does not belong to them
          - [x] Throws a `404 NotFoundError` when the `nutritionId` does not match any nutrition in the database
          - [x] Throws a `401 UnauthorizedError` if no valid user is logged in
    - [x] In the `routes/nutrition.js` file:
      - [x] Implement the features outlined in the tests until they're all passing
  - [x] Commit all work to `git`
- **Additional Resources**
  - [ ] Create model and routes files for 1-2 additional resources that your app will track (sleep, exercise, steps, floors climbed, meditation, mood, heartrate, music practice, etc.)
  - [ ] Commit all work to `git`
- **Summary Statistics**
  - [ ] One of the last features of the API will be a model that calculates summary statistic on the different resources that users are tracking. This includes statistics like average calories per day, or max calories per category. To do that, we'll create a new `Activity` model and an `activity` route that will be used to populate the frontend.
  - [ ] The **Activity** model
    - [x] In the `models` directory, create two new files: `models/Activity.js` and `models/Activity.test.js`
      - [ ] The `Activity` model should have **at least** the following static methods:
        - [ ] `calculateDailyCaloriesSummaryStats`
          - [ ] Should execute a SQL query that calculates **at least** the total calories consumed per day (aliased as `totalCaloriesPerDay`), along with the day (aliased as `date`).
          - [ ] The query should return a row for **each day** containing the total calories consumed per day, and the average caloric content per nutrition entry.
            - [ ] For instance, here's a set of 7 **simplified** nutrition item entries (actual data will look different):
              - 1. `{ id: 1, user_id: 1, calories: 100, category: "candy", created_at: "12-22-2022" }`
              - 2. `{ id: 2, user_id: 1, calories: 200, category: "drink", created_at: "12-22-2022" }`
              - 3. `{ id: 3, user_id: 1, calories: 200, category: "fruit", created_at: "12-23-2022" }`
              - 4. `{ id: 4, user_id: 1, calories: 400, category: "dairy", created_at: "12-23-2022" }`
              - 5. `{ id: 5, user_id: 1, calories: 400, category: "drink", created_at: "12-23-2022" }`
              - 6. `{ id: 6, user_id: 1, calories: 700, category: "fruit", created_at: "12-24-2022" }`
              - 7. `{ id: 7, user_id: 1, calories: 100, category: "fruit", created_at: "12-24-2022" }`
            - [ ] The summary stats returned from the query should look like this:
              - 1. `{ date: "12-22-2022", totalCaloriesPerDay: 300 }`
              - 2. `{ date: "12-23-2022", totalCaloriesPerDay: 1000 }`
              - 3. `{ date: "12-24-2022", totalCaloriesPerDay: 800 }`
        - [ ] `calculatePerCategoryCaloriesSummaryStats`
          - [ ] Should execute a SQL query that calculates **at least** the average calories consumed per category (aliased as `avgCaloriesPerCategory` and **rounded down to one decimal place**), along with the category (aliased as `category`).
          - [ ] The query should return a row for **each day** containing the total calories consumed per day, and the average caloric content per nutrition entry.
            - [ ] For instance, here's a set of 7 **simplified** nutrition item entries (actual data will look different):
              - 1. `{ id: 1, user_id: 1, calories: 100, category: "candy", created_at: "12-22-2022" }`
              - 2. `{ id: 2, user_id: 1, calories: 200, category: "drink", created_at: "12-22-2022" }`
              - 3. `{ id: 3, user_id: 1, calories: 200, category: "fruit", created_at: "12-23-2022" }`
              - 4. `{ id: 4, user_id: 1, calories: 400, category: "dairy", created_at: "12-23-2022" }`
              - 5. `{ id: 5, user_id: 1, calories: 400, category: "drink", created_at: "12-23-2022" }`
              - 6. `{ id: 6, user_id: 1, calories: 700, category: "fruit", created_at: "12-24-2022" }`
              - 7. `{ id: 7, user_id: 1, calories: 100, category: "fruit", created_at: "12-24-2022" }`
            - [ ] The summary stats returned from the query should look like this:
              - 1. `{ category: "candy", avgCaloriesPerCategory: 100.0 }`
              - 2. `{ category: "drink", avgCaloriesPerCategory: 300.0 }`
              - 3. `{ category: "fruit", avgCaloriesPerCategory: 266.6 }`
              - 4. `{ category: "dairy", avgCaloriesPerCategory: 400.0 }`
    - [ ] In the `models/Activity.test.js` file:
      - [ ] Test the `calculateDailyCaloriesSummaryStats` method. Write test cases for:
        - [ ] The `calculateDailyCaloriesSummaryStats` method correctly calculates summary statistics per day
        - [ ] Only uses the `nutrition` entries belonging to the user when calculating summary statistics
        - [ ] Returns an empty array when the user has no `nutrition` entries
      - [ ] Test the `calculatePerCategoryCaloriesSummaryStats` method. Write test cases for:
        - [ ] The `calculatePerCategoryCaloriesSummaryStats` method correctly calculates average calories per category summary statistics
        - [ ] Only uses the `nutrition` entries belonging to the user when calculating summary statistics
        - [ ] Returns an empty array when the user has no `nutrition` entries
    - [ ] In the `models/Activity.js` file:
      - [ ] Implement the features outlined in the tests until they're all passing
    - [ ] Commit all work to `git`
  - [x] The **/activity** routes
    - [x] In the `routes` directory, create two new files: `routes/activity.js` and `routes/activity.test.js`
      - [x] A new Express router should be created that will be mounted at the `/activity` endpoint. It should handle:
        - [x] `GET` requests to the `/` endpoint
          - [x] It should send a JSON response back to the client with summary stats for each resource in the following format:
            - [x] `{ "nutrition": { "calories": { "perDay": [...], "perCategory": [...] }, ...anyOtherStats }, ...statsForOtherResources }`
    - [x] In the `routes/activity.test.js` file:
      - [x] Test the `GET /activity` endpoint
        - [x] Write test cases for:
          - [x] Provides a JSON response containing arrays of summary stats for resources, attributes, and metrics
          - [x] Correctly calculates `totalCaloriesPerDay` for a user's `nutrition` entries
          - [x] Correctly calculates `avgCaloriesPerCategory` for a user's `nutrition` entries
          - [x] Only returns summary stats based on entries that the currently authenticated user owns
          - [x] Throws an `UnauthenticatedError` if no valid user is logged in
    - [x] In the `routes/activity.js` file:
      - [x] Implement the features outlined in the tests until they're all passing
  - [x] Commit all work to `git`
