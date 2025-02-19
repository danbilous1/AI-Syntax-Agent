import { useState } from "react";

function Input({ label, placeholder, id, onChange, onDelete, isPlanInput }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="input-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="input-label-wrapper">
        {isPlanInput && <span className="input-number">{label}</span>}
        <div className="input-wrapper">
          <input
            id={id}
            placeholder={placeholder}
            onChange={(e) => onChange(id, e.target.value)}
          />
          {isPlanInput && isHovered && (
            <button
              className="btn btn-danger btn-sm delete-btn"
              onClick={() => onDelete(id)} // Trigger delete on button click
            >
              X
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Input;
