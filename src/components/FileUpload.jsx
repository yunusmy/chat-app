import { useRef } from 'react';

const FileUpload = ({ onFileSelect, disabled }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 50 * 1024) {
      onFileSelect(file);
    } else {
      alert('File size must be less than 50KB');
    }
    e.target.value = null; // Reset input
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={disabled}
      />
      <button
        onClick={() => fileInputRef.current.click()}
        disabled={disabled}
      >
        Upload File
      </button>
    </div>
  );
};

export default FileUpload;