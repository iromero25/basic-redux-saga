# basic-redux-saga

Improvement over the [basic-redux](https://github.com/iromero25/basic-redux) app using Sagas as Redux middleware to handle basic asynchronous side effects.

This app reads notes from a database. Notes can be added or removed from the database (using the provided user interface), and thus, the data is persistent.

The finished application can be accessed [here](https://iromero-basic-redux-saga.herokuapp.com/).

## Technologies used

- Typescript is used as programming language.
- React library is used to create the front-end.
- Redux is used to handle store management. React-Redux is used to connect both React and Redux.
- Sagas is the Redux middleware used to handle asynchronous side effects like AJAX requests.
- Json-sever is used to mock database operations. This server is just using a json file to persist the data.
- ExpressJs running on Node is used to write a very simple server routing required requests to the json-server and to serve static content.

## Why is this project important?

The main purpose of this app is to introduce the usage and to familiarize myself with the implementation of Redux-Sagas
as the preferred way to handle asynchronous AJAX requests. Sagas are meant to be a powerful way to deal with side-effects in the store management tasks carried by Redux and represent a better alternative over Thunks according to the developer community.

## saga-related actions explained simply

The main purpose of this app is to have a working example of sagas. I might be repeating myself here but these are the most important things to know about sagas:

- Sagas is a Redux middleware
- Sagas are written using ES6 _Generators_ and as a result, provide powerful and elegant solutions that deal with asynchronous operations
- Since it is middleware, it sits in between an action and a reducer. Therefore, there are actions that are specifically handled by sagas.
- The Sagas library provide some useful effects for saga manipulation. Some examples are _put_, _call_ and _takeAll_.
- The _put_ effect is particularly useful because that's the way a saga _dispatches_ an action (possibly via an action creator as well) that can potentially be processed by Redux's reducers as expected.
- The _call_ effect is simply used to call a function. This is normally used along the `yield` keyword to execute api calls. When yield is used in a generator, the execution is paused until _call_ returns data.

In this app, I am addigng the _SagaAction_ prefix fo those actions that are listened by sagas, for clarity. You can see those at the [sagaActionCreators.ts](./src/redux/actions/sagasActionCreators.ts) file.

As an example I am ilustrating the how the `loadNotesSagaAction` is processed in the app, in order:

1. `loadNotesSagaAction` is mapped to props in the `AllNotes` component and **dispatched** when the app loads (via useEffect). An action creator is used by the dispatcher an thus, and action with the `LOAD_NOTES_SAGA_ACTION` action type is dispatched.
1. The `LOAD_NOTES_SAGA_ACTION` type is listened by the sagas and it is handled by the `loadNotesSaga` saga, which does thre things:
   1. Dispatches `setLoading` adn waits for this op to complete.
   1. Dispatches the `getAllNotesAPI` async op to fetch all notes from the db. Waits for the data to come back.
   1. Dispatches the `setAllNotes` action passing all the retrieved notes from the database to theys can be processed by the reducer and thus added to the `notes` part of the store.
1. As a result of the previous actions, the store is updated with all notes and since the `AllNotes` component is mapping notes to props (it is connected to the store), it updates it's part of of the DOM to show the notes on the UI.

## Front-end testing

I am adding some testing to assert the DOM is modified in the way I expect. My expectation is to ensure the DOM is updated as a result of triggering an action and Redux acting accordingly. I am using React's version of the `Testing Library` library.

As per the description above, we can think of my tests as some sort of integration testing.

The test I have added so far:

- [addNoteActionSpy.test.tsx](/.src/redux/actions/addNoteActionSpy.test.tsx) is a simple example on how to spy an action creator that is dispatched through `mapStateToProps`. Refer to the notes I have added in the code for more detailed info.

## server

The `json-server` library is used as fake server that nevertheless allows us to execute HTTP Requests to our local server. This will help us with teh executing of the several asynchrounous side-effects that are the essence of this app.

## NPM Registry and Library dependencies

As a reminder, library dependencies were all install using NPM's public repository using
`YARN_REGISTRY=https://registry.npmjs.org yarn install`

## environment variables

There's a great articule to read regarding handling environment variables in React worth reading: https://trekinbami.medium.com/using-environment-variables-in-react-6b0a99d83cf5
