# basic-redux-saga
Improvement over the [basic-redux](https://github.com/iromero25/basic-redux) app using Sagas as Redux middleware to handle basic asynchronous side effects.

This app reads notes from a database. Notes can be added or removed from the database (using the provided user interface), and thus, the data is persistent.

## Technologies used

* Typescript is used as programming language.
* React library is used to create the front-end.
* Redux is used to handle store management. React-Redux is used to connect both React and Redux.
* Sagas is the Redux middleware used to handle asynchronous side effects like AJAX requests.
* Json-sever is used to mock database operations. This server is just using a json file to persist the data.
* ExpressJs running on Node is used to write a very simple server routing required requests to the json-server and to serve static content.

## Why is this project important?

The main purpose of this app is to introduce the usage and to familiarize myself with the implementation of Redux-Sagas
as the preferred way to handle asynchronous AJAX requests. Sagas are meant to be a powerful way to deal with side-effects in the store management tasks carried by Redux and represent a better alternative over Thunks according to the developer community.

## server
The `json-server` library is used as fake server that nevertheless allows us to execute HTTP Requests to our local server. This will help us with teh executing of the several asynchrounous side-effects that are the essence of this app.

## NPM Registry and Library dependencies
As a reminder, library dependencies were all install using NPM's public repository using
`YARN_REGISTRY=https://registry.npmjs.org yarn install`