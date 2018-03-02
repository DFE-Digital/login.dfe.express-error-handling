# login.dfe.express-error-handling
[![Build Status](https://travis-ci.org/DFE-Digital/login.dfe.express-error-handling.svg?branch=master)](https://travis-ci.org/DFE-Digital/login.dfe.express-error-handling)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

Error handling middleware for express applications

# Usage

## Error Handler middleware
The error handler middleware provides a standard express error handler middleware function that will log
the error and return a 500 result. It takes an object that can have a `logger` and `errorPageRenderer`.

`logger` should be an object that has an error function on it, with a signature `error(message, details)`; where message is a string nad details is an object.

`errorPageRenderer` is optional, but if passed, should be a function that can take an error and return an object with properties `content` and `contentType`. These will be used as the respective details in the response.
```javascript
const { getErrorHandler } = require('login.dfe.express-error-handling');
const errorPageRenderer = (error) => {
  render('500', {error});
}

app.use(getErrorHandler(logger, errorPageRenderer))
```

## asyncWrapper
The `asyncWrapper` can be used to wrap async actions for express, so that errors are handled and
passed through the standard express error chain.

```javascript
const { asyncWrapper } = require('login.dfe.express-error-handling');

app.use('/my-route', asyncWrapper(async (req, res) => {
  await someAction();
  
  res.status(204).send();
}));
```


## EJS Error Page Renderer
The package includes an EJS error page renderer:

```javascript
const { getErrorHandler, ejsErrorPages } = require('login.dfe.express-error-handling');

const showErrorDetailsOnPage = false; // You can include error details on the page in appropriate environments
const urls = { help: 'http://url.to/help' }; // Links to common locations, such as help

const errorPageRenderer = ejsErrorPages.getErrorPageRenderer(urls, showErrorDetailsOnPage);

app.use(getErrorHandler({
  logger,
  errorPageRenderer,
}));
```