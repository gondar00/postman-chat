# Postman Chat

## Installation

```bash
yarn install
```

## Running Dev Server
- Open two terminals and enter the below commands into the console

```bash
yarn start
```

```bash
yarn dev:wds
```

## Building and Running Production Server

```bash
yarn prod:build
yarn prod:start
```

## Explanation
Following technologies have been implemented 

Front-End: React, Redux, React Router, redux-actions, redux-thunk

Back-End: Express, Server-side rendering, HTML template string

Styling: Bootstrap 4, JSS, react-jss

Libs: ImmutableJS, isomorphic-fetch

Linting / Type Checking: ESLint, ESLint Airbnb Config, Flow, Compat

Testing: Jest, fetch-mock, redux-mock-store

Build: Babel, Webpack, babel-plugin-flow-react-proptypes

Infra: Yarn, Webpack Dev Server, PM2, Husky Git Hooks, rimraf

Services: Heroku, Travis, Coveralls