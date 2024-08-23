import React, { useState } from 'react';
import '../styles/Todoform.css';

const Todoform = ({ addTodo }) => {
    const [todo, setTodo] = useState('');
    const [selectedColor, setSelectedColor] = useState(null);

    const handleInputChange = (e) => {
        setTodo(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dueDate = document.getElementById('duedate').value; // Get the selected date
        if (todo.trim()) {
            addTodo({ text: todo, color: selectedColor, dueDate }); // Pass text, color, and date
            setTodo('');
        }
    };

    const colors = {
        'light-green': 'rgb(44, 186, 0)',
        'green': 'rgb(163, 255, 0)',
        'yellow': 'rgb(255, 244, 0)',
        'orange': 'rgb(255, 167, 0)',
        'red': 'rgb(255, 0, 0)'
    };

    return (
        <div className='form-container'>
        <h2>Add New To-Do:</h2>
        <form onSubmit={handleSubmit} className="todo-form">
            <input 
                type="text" 
                value={todo} 
                onChange={handleInputChange} 
                placeholder="Add a new to-do" 
                className="todo-input"
            />
            <h3>Select Due Date:</h3><h5>(optional)</h5>
            <input className='date-picker' type="date" id="duedate" name="duedate"></input>
            <h3>Select Urgency:</h3>
            <div className="color-selector">
                {Object.keys(colors).map((colorKey) => (
                    <div 
                        key={colorKey} 
                        className={`color-box ${selectedColor === colors[colorKey] ? 'selected' : ''}`}
                        style={{ backgroundColor: colors[colorKey] }}
                        onClick={() => setSelectedColor(colors[colorKey])}
                    />
                ))}
            </div>
            <button type="submit" className="add-button">Add</button>
        </form>
        </div>
    );
};

export default Todoform;