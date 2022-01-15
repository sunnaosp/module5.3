//requiering express and initializing the app:
const express = require("express");
const app = express();
//requiering the cors middleware:
const cors = require("cors");
require("dotenv").config();
const { Client } = require("pg");

const PORT = 5001; //we will use port 5001

app.use(cors()); //telling express to use the cors middleware
app.use(express.json());

app.get("/", async (req, res) => {
  //listen to a get request
  const client = new Client();
  await client.connect();
  const data = await client.query("SELECT * from greetings;");
  res.send(data.rows);
  await client.end();
});

app.post("/", async (req, res) => {
  if (!req?.body?.greeting) {
    res.send("error");
    return;
  }

  //listen to a get request
  const client = new Client();
  await client.connect();
  await client.query(
    "INSERT INTO greetings (greeting) VALUES ('" + req.body.greeting + "');"
  );
  const data = await client.query("SELECT * from greetings;");
  res.send(data.rows);
  await client.end();
});

app.patch("/", async (req, res) => {
  if (!req?.body?.greeting || !req?.body?.serial) {
    res.send("error");
    return;
  }
  //listen to a get request
  const client = new Client();
  await client.connect();
  await client.query(
    "UPDATE greetings SET greeting = '" +
      req.body.greeting +
      "' WHERE serial = '" +
      req.body.serial +
      "';"
  );
  const data = await client.query("SELECT * from greetings;");
  res.send(data.rows);
  await client.end();
});

app.delete("/", async (req, res) => {
  if (!req?.body?.serial) {
    res.send("error");
    return;
  }
  //listen to a get request
  const client = new Client();
  await client.connect();
  await client.query(
    "DELETE FROM greetings WHERE serial = '" + req.body.serial + "';"
  );
  const data = await client.query("SELECT * from greetings;");
  res.send(data.rows);
  await client.end();
});

app.listen(PORT, () => {
  //listen to the port we chose above
  //print to the console that the server is listening
  console.log("listening to port: " + PORT);
});
