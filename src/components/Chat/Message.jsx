import { useAuth } from '../../context/AuthContext';

const Message = ({ message }) => {
  const { user } = useAuth();
  const isCurrentUser = message.senderId === user?.id;

  return (
    <div className={`message ${isCurrentUser ? 'sent' : 'received'}`}>
      <div className="message-content">
        {message.type === 'text' ? (
          <p>{message.content}</p>
        ) : (
          <a
            href={`https://chat-api-vecx.onrender.com/uploads/${message.content}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {message.content}
          </a>
        )}
      </div>
      <div className="message-meta">
        <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
        <span>{message.status}</span>
      </div>
    </div>
  );
};

export default Message;