import React, { useEffect, useRef, useState } from "react";
import "./ContextMenu.css";

const ContextMenu = ({ options, position, onClose, isSubmenu }) => {
  const menuRef = useRef(null);
  const [submenuPosition, setSubmenuPosition] = useState(null);
  const [submenuOptions, setSubmenuOptions] = useState(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !isSubmenu) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, isSubmenu]);

  const handleMouseEnter = (event, submenu) => {
    if (submenu) {
      const { right, top } = event.target.getBoundingClientRect();
      setSubmenuPosition({ x: right, y: top });
      setSubmenuOptions(submenu);
    }
  };

  const handleOptionClick = (event, option) => {
    if (option.submenu) return;
    option.action();
    onClose();
  };

  return (
    <div ref={menuRef}>
      <ul
        className="context-menu"
        style={{ top: position.y, left: position.x }}
      >
        {options.map((option, index) => (
          <li
            key={index}
            onClick={(event) => handleOptionClick(event, option)}
            onMouseEnter={(event) => handleMouseEnter(event, option.submenu)}
          >
            {option.label}
            {option.submenu && <span className="submenu-arrow">▶</span>}
          </li>
        ))}
      </ul>
      {submenuOptions && submenuPosition && (
        <ContextMenu
          options={submenuOptions}
          position={submenuPosition}
          onClose={onClose}
          isSubmenu={true}
        />
      )}
    </div>
  );
};

export default ContextMenu;
