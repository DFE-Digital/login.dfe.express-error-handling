const express = require("express");
const { asyncWrapper, getErrorHandler, ejsErrorPages } = require("./../lib");

const app = express();
const urls = {
  help: "http://localhost:1234/help/contact",
  assets: "https://dev-cdn.signin.education.gov.uk",
  assetsVersion: "1",
};

app.get(
  "/greet",
  asyncWrapper((req, res) => {
    const name = req.query.name || "Unnamed requestor";
    res.send(`Hello ${name}`);
  }),
);

app.get(
  "/broken",
  asyncWrapper(async () => {
    return Promise.reject("This page has an async error");
  }),
);

app.use(
  getErrorHandler({
    logger: console,
    errorPageRenderer: ejsErrorPages.getErrorPageRenderer(
      urls,
      process.env.NODE_ENV === "dev",
    ),
  }),
);

let port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
if (!port || isNaN(port)) {
  port = 3000;
}
app.listen(port, () => {
  console.info(`listening at http://localhost:${port}`);
});
