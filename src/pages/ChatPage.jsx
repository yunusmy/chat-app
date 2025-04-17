import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMessages } from "../api/messages"; // Assuming you have an API function to fetch messages
import ChatList from "../components/Chat/ChatList";
import MessageInput from "../components/Chat/MessageInput";
import MessagesList from "../components/Chat/MessagesList";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Fetch messages when selectedChat changes
  useEffect(() => {
    if (selectedChat) {
      const fetchMessages = async () => {
        try {
          const fetchedMessages = await getMessages(selectedChat); // Fetch messages from API
          setMessages(fetchedMessages);
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        }
      };

      fetchMessages();
    }
  }, [selectedChat]);

  // Handle sending a message
  const handleSendMessage = async () => {
    try {
      const fetchedMessages = await getMessages(selectedChat); // Re-fetch messages after sending
      setMessages(fetchedMessages);
    } catch (error) {
      console.error("Failed to refresh messages:", error);
    }
  };

  return (
    <div className="chat-page">
      <Navbar />
      <div className="chat-container">
        <ChatList onSelectChat={setSelectedChat} />
        <div className="chat-area">
          {selectedChat ? (
            <>
              <MessagesList messages={messages} />
              <MessageInput chatId={selectedChat} onSend={handleSendMessage} />
            </>
          ) : (
            <div className="no-chat-selected">
              Select a chat or create a new one
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
