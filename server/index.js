const express = require("express");
const app = express();
const WSserver = require("express-ws")(app);
const aWss = WSserver.getWss();
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(express.json());

app.ws("/", (ws, req) => {
  console.log("Seting up done");
  ws.send("Seccess connected");
  ws.on("message", (msg) => {
    msg = JSON.parse(msg);
    console.log(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break;
      case "draw":
        broadcastConnection(ws, msg);
        break;
    }
  });
});

app.post("/image", (req, res) => {
  try {
    const data = req.body.img.replase("data:image/png;base64,", "");
    fs.watchFileSync(
      path.resolve(__dirname, "./files", `${req.query.id}.png`),
      data,
      "base64"
    );
    return res.status(200).json({message: "Dawnloded"});
  } catch (e) {
    return res.status(500).json("error");
  }
});
app.get("/image", (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json("error");
  }
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

const connectionHandler = (ws, msg) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
  console.log(msg);
  aWss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};
