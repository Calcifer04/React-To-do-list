import React, { useState } from 'react';
import '../styles/Todoform.css';

const Todoform = ({ addTodo }) => {
    const [todo, setTodo] = useState('');

    const handleInputChange = (e) => {
        setTodo(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (todo.trim()) {
            addTodo(todo);
            setTodo('');
        }
    };

    const colors = {'light-green' : (15, 254, 0),
                    'green' : (93, 197, 0),
                    'yellow': (212, 255, 0),
                    'orange': (255, 158, 0 ),
                    'red' :   (255, 12, 0)}
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
            <button type="submit" className="add-button">Add</button>
        </form>
        </div>
    );
};

export default Todoform;