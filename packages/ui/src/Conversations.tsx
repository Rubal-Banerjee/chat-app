import React from "react";
import Conversation from "./Conversation";

const Conversations = () => {
  return (
    <div className="py-2 flex flex-col overflow-auto">
      <Conversation name="Rubal" profilePicture="xyz" />
    </div>
  );
};

export default Conversations;
