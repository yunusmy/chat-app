import { useRef, useState } from "react";
import { sendMessage } from "../../api/messages";
import { uploadFile } from "../../api/upload";
import { useAuth } from "../../context/AuthContext"; // Importing useAuth here

const MessageInput = ({ chatId, onSend }) => {
  const [content, setContent] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth(); // Get the user object
  const fileInputRef = useRef(null); // Reference for the file input element

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await sendMessage({
        chatId,
        content,
        senderId: user.id,
        type: "text",
      });
      setContent("");
      onSend();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setIsUploading(true);

    try {
      const uploadResponse = await uploadFile(file, user.id);
      await sendMessage({
        chatId,
        content: uploadResponse.filename,
        senderId: user.id,
        type: file.type.startsWith("image/") ? "image" : "file",
      });
      onSend();
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Trigger file input when the button is clicked
  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="message-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          disabled={isUploading}
        />
        <button type="submit" disabled={isUploading}>
          Send
        </button>
      </form>

      {/* Triggering the file input using fileInputRef */}
      <button
        type="button"
        onClick={handleFileInputClick}
        disabled={isUploading}
      >
        Attach File
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => handleFileUpload(e.target.files[0])}
        disabled={isUploading}
      />

      {isUploading && <div>Uploading file...</div>}
    </div>
  );
};

export default MessageInput;
