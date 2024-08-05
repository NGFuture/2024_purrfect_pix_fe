import { useEffect, useState } from "react";

const EditableText = ({ value, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);


  const handleUpdate = () => {
    setIsEditing(false);
    onEdit(inputValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
        handleUpdate();
    }
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);
  
return isEditing ? (
    
  <>
    <input
        className="flex-1 border-2 border-gray-300 rounded-md px-2 min-w-0"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        autoFocus // Add autoFocus to focus on the input
    />
    <div className="">
    <button onClick={handleUpdate}>V</button>
    <button onClick={() => setIsEditing(false)}>X</button>
    </div>
  </>
) : (
    <div className="flex-1 editable-show" onClick={() => setIsEditing(true)}>
      {inputValue || "n/a"}
      <span className="text-blue-500 hover-show">🖊️</span>
    </div>
);
}
export default EditableText;