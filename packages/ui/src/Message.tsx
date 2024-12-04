import { getTime } from "./utils/extractTime";
import { userAuth } from "./zustand/userAuth";
import { userConversations } from "./zustand/userConversations";

interface MessageProps {
  message: string;
  createdAt: Date;
  senderId: string;
}

const Message = ({ message, createdAt, senderId }: MessageProps) => {
  const { selectedConversation } = userConversations();
  const { user } = userAuth();
  const fromMe = senderId === user?.id;
  const chatBubble = fromMe ? "chat-end" : "chat-start";

  return (
    <div className={`chat ${chatBubble}`}>
      <div className="hidden md:block chat-image avatar">
        <div className="w-6 md:w-10 rounded-full">
          <img
            alt="Chat bubble component"
            src={
              fromMe
                ? user.profilePicture
                : selectedConversation?.profilePicture!
            }
          />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${fromMe && "bg-blue-500"} text-sm md:text-base`}
      >
        {message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-gray-300">
        {getTime(createdAt)}
      </div>
    </div>
  );
};

export default Message;
