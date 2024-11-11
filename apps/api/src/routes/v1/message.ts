import { Router } from "express";
import { authMiddleware } from "../../middleware";
import { client } from "@repo/db/client";

const messageRouter = Router();

messageRouter.post("/send/:id", authMiddleware, async (req, res) => {
  const senderId = req.userId!;
  const receiverId = req.params.id;
  const message = req.body.message as string;

  try {
    let conversation = await client.conversation.create({
      data: {},
    });

    await client.userConversation.create({
      data: {
        userId: senderId,
        conversationId: conversation.id,
      },
    });

    await client.userConversation.create({
      data: {
        userId: receiverId,
        conversationId: conversation.id,
      },
    });

    const messageSent = await client.message.create({
      data: {
        message,
        senderId,
        receiverId,
        conversationId: conversation.id,
      },
    });

    if (!messageSent) {
      res.status(500).json({
        message: "Message sending failed!",
      });
      return;
    }

    res.status(200).json({
      message: "Message sent successfully",
      payload: {
        message: messageSent.message,
      },
    });
  } catch (error) {
    console.log("Database error: ", error);
  }
});

export default messageRouter;
