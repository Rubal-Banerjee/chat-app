import { Message } from "./Message";
import { socketManager } from "./SocketManager";
import { User } from "./User";
import { WebSocket } from "ws";

export class MessageManager {
  private participations: Message[];
  private users: User[];

  public constructor() {
    this.participations = [];
    this.users = [];
  }

  public addUser(user: User) {
    this.users.push(user);
    this.addHandler(user);
  }

  public removeUser(socket: WebSocket) {
    const user = this.users.find((user) => user.socket === socket);

    if (!user) {
      console.log("User does not exists!");
      return;
    }

    this.users = this.users.filter((user) => user.socket !== socket);
    socketManager.removeUser(user);
  }

  private addHandler(user: User) {
    user.socket.on("message", async (data) => {
      const { message, senderId, receiverId } = JSON.parse(data.toString());
      const users = this.participations.find(
        (item) =>
          (item.person1UserId === senderId &&
            item.person2UserId === receiverId) ||
          (item.person1UserId === receiverId && item.person2UserId === senderId)
      );

      if (!users?.id) {
        const participatedUsers = new Message(senderId, receiverId);
        this.participations.push(participatedUsers);
        socketManager.addUser(participatedUsers.id, user);
        socketManager.broadcast(participatedUsers.id, message);
      } else {
        socketManager.addUser(users.id, user);
        socketManager.broadcast(users.id, message);
      }
    });
  }
}
