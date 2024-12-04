import { userConversations } from "./zustand/userConversations";

const Header = () => {
  const { selectedConversation } = userConversations();

  return (
    <div className="bg-slate-500 px-4 py-2 mb-2">
      <span className="label-text text-white">To:</span>{" "}
      <span className="font-bold text-gray-300">
        {selectedConversation?.fullName}
      </span>
    </div>
  );
};

export default Header;
