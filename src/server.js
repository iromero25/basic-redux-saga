"use strict";
exports.__esModule = true;
var express_1 = require("express");
var json_server_1 = require("json-server");
var server = express_1["default"]();
server.use(express_1["default"].static("dist"));
// You may want to mount JSON Server on a specific end-point, for example /api
// Optiona,l except if you want to have JSON Server defaults
// server.use('/api', jsonServer.defaults());
server.use("/api", json_server_1["default"].router("json-server/db.json"));
server.get("/", function (_, res) {
    res.sendFile("index.html");
});
server.listen(process.env.PORT || 3000, function () {
    return console.log("listening on port " + (process.env.PORT || 3000));
});
