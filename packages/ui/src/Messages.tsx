import React from "react";
import Message from "./Message";
import { userConversations } from "./zustand/userConversations";

const Messages = () => {
  const { messages } = userConversations();

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message.message}
          createdAt={message.createdAt}
          senderId={message.senderId}
        />
      ))}
    </div>
  );
};

export default Messages;
