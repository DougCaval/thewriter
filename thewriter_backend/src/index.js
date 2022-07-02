const express = require("express");
const server = express();
 const cors = require('cors');

server.use(express.json());
server .use(cors());

const TaskRoutes = require("./routes/TaskRoutes");
server.use("/estorias", TaskRoutes);

server.listen( process .env.PORT || 8080, () => {
  console.log(" Ther Writer are on line for you...");
});
