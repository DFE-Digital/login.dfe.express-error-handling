const path = require('path');
const { readFileSync } = require('fs');
const ejs = require('ejs');

const appRoot = path.resolve(__dirname, 'views');
const layout = ejs.compile(readFileSync(path.join(appRoot, 'layout.ejs'), 'utf8'));
const error500 = ejs.compile(readFileSync(path.join(appRoot, '500.ejs'), 'utf8'));

const renderPage = (type, details, urls) => {
  let template;
  switch (type.toString()) {
    case '500':
      template = error500;
      break;
    default:
      throw new Error(`Invalid page tyoe ${type}. Available types are 500`);
  }

  const body = template({ details });
  return {
    contentType: 'html',
    content: layout({
      title: 'Error',
      body,
      urls,
    }),
  }
};

const getErrorPageRenderer = (urls, showErrorDetails = false) => {
  return (error) => {
    return renderPage('500', showErrorDetails ? error : null, urls);
  };
};

module.exports = {
  renderPage,
  getErrorPageRenderer,
};