const express = require("express");

const Superheros = require("./superheros/superheros-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/superheros", (req, res) => {
  Superheros.getAll()
    .then(superheros => {
      res.status(200).json(superheros);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/superheros/id", (req, res) => {
  res.end()
});

server.post("/superheros", async (req, res) => {
  if (!req.body.name) return res.status(422).end()
  const hobbit = await Superheros.insert(req.body);
  res.status(201).json(hobbit)
});

server.delete("/superheros/:id", (req, res) => {
  res.end()
});

server.put("/superheros/:id", (req, res) => {
  res.end()
});

module.exports = server;
