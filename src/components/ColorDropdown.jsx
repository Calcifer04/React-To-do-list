import React from 'react';
import '../styles/ColorDropdown.css';

const ColorDropdown = ({ colorOptions, selectedColor, onColorSelect }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <div className="color-dropdown">
            <div
                className="color-dropdown-header"
                style={{ backgroundColor: selectedColor }}
                onClick={toggleDropdown}
            >
                <div className="color-circle" style={{ backgroundColor: selectedColor }} />
            </div>
            {isOpen && (
                <div className="color-dropdown-menu">
                    {colorOptions.map((color) => (
                        <div
                            key={color}
                            className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                            style={{ backgroundColor: color }}
                            onClick={() => {
                                onColorSelect(color);
                                toggleDropdown();
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ColorDropdown;
