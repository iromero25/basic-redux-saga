import express from "express";
import jsonServer from "json-server";

const server = express();
server.use(express.static("dist"));

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use("/api", jsonServer.router("json-server/db.json"));
server.get("/", (_, res) => {
  res.sendFile("index.html");
});

server.listen(process.env.PORT || 3000, () =>
  console.log(`listening on port ${process.env.PORT || 3000}`)
);

// to do: mock some delay for dealing with requests!