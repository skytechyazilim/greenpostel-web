// Custom Node server for Hostinger (Phusion Passenger).
// Passenger sets PORT (often a unix socket path or port); we boot Next and hand
// every request to its handler so middleware (i18n auto-detect) keeps working.
const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`> GreenPostel ready on ${port}`);
  });
});
