import React, { useState } from "react";
import Header from "./Header";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import NoChatSelected from "./NoChatSelected";
import { userConversations } from "./zustand/userConversations";

const MessageContainer = () => {
  const { selectedConversation } = userConversations();

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {selectedConversation ? (
        <>
          <Header />
          <Messages />
          <MessageInput />
        </>
      ) : (
        <NoChatSelected />
      )}
    </div>
  );
};

export default MessageContainer;
