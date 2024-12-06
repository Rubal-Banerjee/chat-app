import { WebSocketServer } from "ws";
import url from "url";
import { User } from "./User";
import { MessageManager } from "./MessageManager";

const wss = new WebSocketServer({ port: 8080 });

const messageManager = new MessageManager();

wss.on("connection", (ws, req) => {
  const userId = url.parse(req.url!, true).query.userId as string;
  const user = new User(ws, userId);

  messageManager.addUser(user);

  ws.on("close", () => {
    messageManager.removeUser(ws);
  });
});

console.log("done");
