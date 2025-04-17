import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChats } from "../../api/chats";
import { useAuth } from "../../context/AuthContext";

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchChats = async () => {
      try {
        const data = await getChats(user.id);
        setChats(data);
      } catch (err) {
        setError(err.message || "Failed to load chats");
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [user, navigate]);

  if (loading) return <div>Loading chats...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="chat-list">
      <h3>Your Chats</h3>
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => onSelectChat(chat.id)}>
            {chat.name || `Chat ${chat.id.slice(0, 8)}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
