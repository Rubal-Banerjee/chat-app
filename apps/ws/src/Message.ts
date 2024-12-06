import { randomUUID } from "crypto";

export class Message {
  public id: string;
  public person1UserId: string | null;
  public person2UserId: string | null;

  public constructor(person1UserId: string, person2UserId: string) {
    this.id = randomUUID();
    this.person1UserId = person1UserId;
    this.person2UserId = person2UserId;
  }
}
