import { User } from "./User";

class SocketManager {
  private static instance: SocketManager;
  private userRooms: Map<string, User[]>;
  private userRoomMapping: Map<string, string>;

  private constructor() {
    this.userRooms = new Map<string, User[]>();
    this.userRoomMapping = new Map<string, string>();
  }

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new SocketManager();
    return this.instance;
  }

  public addUser(roomId: string, user: User) {
    this.userRooms.set(roomId, [...(this.userRooms.get(roomId) || []), user]);
    this.userRoomMapping.set(user.userId, roomId);
  }

  public broadcast(roomId: string, message: string) {
    const users = this.userRooms.get(roomId);

    if (!users) {
      console.log("No user found in room!");
      return;
    }

    users.forEach((user) => user.socket.send(message));
  }

  public removeUser(user: User) {
    const roomId = this.userRoomMapping.get(user.userId);

    if (!roomId) {
      console.log("User was not present in any room!");
      return;
    }

    const room = this.userRooms.get(roomId) || [];
    const remainingUser = room?.filter(
      (element) => element.userId !== user.userId
    );

    this.userRooms.set(roomId, remainingUser);

    if (this.userRoomMapping.get(roomId)?.length === 0) {
      this.userRoomMapping.delete(roomId);
    }

    this.userRoomMapping.delete(user.userId);
  }
}

export const socketManager = SocketManager.getInstance();
