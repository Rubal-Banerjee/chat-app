import Conversation from "./Conversation";
import useConversations from "./hooks/useConversations";

const Conversations = () => {
  const { conversations } = useConversations();

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation) => (
        <Conversation
          key={conversation.id}
          id={conversation.id}
          fullName={conversation.fullName}
          profilePicture={conversation.profilePicture}
        />
      ))}
    </div>
  );
};

export default Conversations;
