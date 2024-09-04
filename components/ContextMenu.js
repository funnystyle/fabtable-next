import React, { useEffect, useRef } from "react";
import "./ContextMenu.css";

const ContextMenu = ({ options, position, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <ul
      className="context-menu"
      style={{ top: position.y, left: position.x }}
      ref={menuRef}
    >
      {options.map((option, index) => (
        <li key={index} onClick={() => { option.action(); onClose(); }}>
          {option.label}
        </li>
      ))}
    </ul>
  );
};

export default ContextMenu;
