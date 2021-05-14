import express from "express";
import jsonServer from "json-server";

var server = express();
server.use(express.static("dist"));

// You may want to mount JSON Server on a specific end-point, for example /api
// Optiona,l except if you want to have JSON Server defaults
// server.use('/api', jsonServer.defaults());
server.use("/api", jsonServer.router("json-server/db.json"));

server.get("/", (_, res) => {
  res.sendFile("index.html");
});

server.listen(process.env.PORT || 3000, () =>
  console.log(`listening on port ${process.env.PORT || 3000}`)
);
