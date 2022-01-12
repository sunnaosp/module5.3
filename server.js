//requiering express and initializing the app:
const app = require("express")();
//requiering the cors middleware:
const cors = require("cors");
require("dotenv").config();
const { Client } = require("pg");

const PORT = 5001; //we will use port 5001

app.use(cors()); //telling express to use the cors middleware

app.get("/", async (req, res) => {
  //listen to a get request
  const client = new Client();
  await client.connect();
  const data = await client.query("SELECT * from devices;");
  res.send(data.rows);
  await client.end();
});

app.listen(PORT, () => {
  //listen to the port we chose above
  //print to the console that the server is listening
  console.log("listening to port: " + PORT);
});
