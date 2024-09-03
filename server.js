const {
  createServer
} = require("node:http");
const {
  writeFile,
  access,
  constants,
  readFile
} = require("node:fs/promises");
const {
  readFileSync
} = require("node:fs");
const {
  join
} = require("node:path");
const {
  requestHandler,
  notFoundContent
} = require("./modules/requestHandler");

const serverHost = "127.0.0.1";
const serverPort = 8000;

const tableHTML = readFileSync(join(__dirname, "/table/index.html"));
const tableAssetsJS = readFileSync(
  join(__dirname, "/table/javascripts/assets.js")
);
const tableMainJS = readFileSync(join(__dirname, "/table/javascripts/main.js"));
const tablModaltsJS = readFileSync(
  join(__dirname, "/table/javascripts/modal.js")
);

const tableModalCSS = readFileSync(
  join(__dirname, "/table/stylesheets/modal.css")
);
const tableStyleCSS = readFileSync(
  join(__dirname, "/table/stylesheets/style.css")
);
const tableTableCSS = readFileSync(
  join(__dirname, "/table/stylesheets/table.css")
);



const server = createServer((request, response) => {
  const {
    method,
    url: pathname
  } = request;

  console.info(`${method} ${pathname}`);

  if (method === "GET") {
    switch (pathname) {
      case "/":
        requestHandler(response, "Root ");
        break;

      case "/home":
        requestHandler(response, "Root Route");
        break;

      case "/table":
        requestHandler(response, tableHTML, "text/html");
        break;

      case "/modal.css":
        requestHandler(response, tableModalCSS, "text/css");
        break;
      case "/style.css":
        requestHandler(response, tableStyleCSS, "text/css");
        break;
      case "/table.css":
        requestHandler(response, tableTableCSS, "text/css");
        break;

      case "/assets.js":
        requestHandler(response, tableAssetsJS, "text/javascript");
        break;
      case "/main.js":
        requestHandler(response, tableMainJS, "text/javascript");
        break;
      case "/modal.js":
        requestHandler(response, tablModaltsJS, "text/javascript");
        break;


      default:
        requestHandler(response, notFoundContent, "text/html", 404);
        break;
    }
  } else {
    requestHandler(response, notFoundContent, "text/html", 404);
  }
});

server.listen(serverPort, serverHost, () => {
  console.info(`Listening on ${serverHost}:${serverPort} ...`);
});