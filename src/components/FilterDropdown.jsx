import React from 'react';
import '../styles/FilterDropdown.css';

const FilterDropdown = () => {
    const [Open, setOpen] = React.useState(false);

    const toggleDropdown = () => {
        setOpen(!Open);
};

return (
    <div className="dropdown">
        <button onClick={toggleDropdown}>Dropdown</button>
        {Open ? (
            <ul className="menu">
                <li className="menu-item">
                    <button>Menu 1</button>
                </li>
                <li className="menu-item">
                    <button>Menu 2</button>
                </li>
            </ul>
        ) : null}
    </div>
    );
};

export default FilterDropdown;