import { Router } from "express";
import { authMiddleware } from "../../middleware";
import { client } from "@repo/db/client";

const messageRouter = Router();

messageRouter.get("/conversations", authMiddleware, async (req, res) => {
  try {
    const users = await client.user.findMany({
      where: {
        id: {
          not: req.userId!,
        },
      },
      select: {
        id: true,
        fullName: true,
        profilePicture: true,
      },
    });

    if (!users) {
      res.status(200).json([]);
      return;
    }

    res.status(200).json(users);
  } catch (error) {
    console.log("Error in fetching user database: ", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

messageRouter.get("/:id", authMiddleware, async (req, res) => {
  const userToChat = req.params.id;
  const senderId = req.userId!;

  try {
    const conversation = await client.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, userToChat],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!conversation) {
      res.status(200).json([]);
      return;
    }

    res.status(200).json(conversation.messages);
  } catch (error) {
    console.log("Error in fetching message database: ", error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

messageRouter.post("/send/:id", authMiddleware, async (req, res) => {
  const senderId = req.userId!;
  const receiverId = req.params.id;
  const message = req.body.message;

  try {
    let conversation = await client.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    });

    if (!conversation) {
      conversation = await client.conversation.create({
        data: {
          participantIds: {
            set: [senderId, receiverId],
          },
        },
      });
    }

    const messageSent = await client.message.create({
      data: {
        message: message,
        senderId,
        conversationId: conversation.id,
      },
    });

    if (!messageSent) {
      res.status(500).json({
        message: "Message sending failed!",
      });
      return;
    }

    await client.conversation.update({
      where: {
        id: conversation.id,
      },
      data: {
        messages: {
          connect: {
            id: messageSent.id,
          },
        },
      },
    });

    // WebSocket will go here

    res.status(201).json({
      message: "Message sent successfully",
      payload: messageSent.message,
    });
  } catch (error) {
    console.log("Database error: ", error);
  }
});

export default messageRouter;
