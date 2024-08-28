import React, { useState, useEffect } from 'react';
import '../styles/Todolist.css';
import { useNavigate } from 'react-router-dom';
import Todoform from './Todoform';
import ColorDropdown from './ColorDropdown';

const LOCAL_STORAGE_KEY = 'todos';

const Todolist = () => {
    const navigate = useNavigate();

    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [expandedIndex, setExpandedIndex] = useState(null);
    const [editIndex, setEditIndex] = useState(null);
    const [editText, setEditText] = useState('');
    const [editColor, setEditColor] = useState('rgb(44, 186, 0)');
    const [editDate, setEditDate] = useState('');

    const colorOptions = [
        'rgb(44, 186, 0)',
        'rgb(255, 167, 0)',
        'rgb(255, 0, 0)'
    ];

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }, [todos]);

    const addTodo = (newTodo) => {
        setTodos([...todos, newTodo]);
    };

    const removeTodo = (index) => {
        const confirmation = window.confirm('Are you sure you want to delete this item?');
        if (confirmation) {
            const updatedTodos = todos.filter((_, i) => i !== index);
            setTodos(updatedTodos);
        }
    };

    const editTodo = (index) => {
        const todo = todos[index];
        setEditIndex(index);
        setEditText(todo.text);
        setEditColor(todo.color || colorOptions[0]);
        setEditDate(todo.dueDate || '');
    };

    const saveEdit = () => {
        if (editIndex !== null) {
            const updatedTodos = todos.map((todo, i) =>
                i === editIndex ? { ...todo, text: editText, color: editColor, dueDate: editDate } : todo
            );
            setTodos(updatedTodos);
            setEditIndex(null);
            setEditText('');
            setEditColor('');
            setEditDate('');
        }
    };
    
    const cancelEdit = () => {
        setEditIndex(null);
        setEditText('');
        setEditColor('');
        setEditDate('');
    };
    
    const toggleDescription = (index) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    
    console.log(todos);
    console.log(JSON.stringify(localStorage.getItem(LOCAL_STORAGE_KEY)))
    return (
        <>
        <button 
            className='logbook'
            onClick={() => navigate('/logbook')}
            >
            🕮</button>
        <div className="todo-container">
            <Todoform addTodo={addTodo} />
            <div className="todo-list">
                <h1>To-Do List:</h1>
                <ul>
                    {todos?.map((todo, index) => (
                        <li 
                            key={index} 
                            className="todo-item"
                            onClick={() => toggleDescription(index)}
                        >
                            {editIndex === index ? (
                                <div className="edit-container">
                                    <ColorDropdown
                                        colorOptions={colorOptions}
                                        selectedColor={editColor}
                                        onColorSelect={setEditColor}
                                    />
                                    <input
                                        className='edit-title'
                                        type="text"
                                        value={editText}
                                        onChange={(e) => setEditText(e.target.value)}
                                        placeholder="Todo text"
                                        autoFocus
                                    />
                                    <input
                                        className='edit-date'
                                        type="date"
                                        value={editDate}
                                        onChange={(e) => setEditDate(e.target.value)}
                                    />
                                </div>
                            ) : (
                                <>
                                    {todo.color && (
                                        <span
                                            className="color-indicator"
                                            style={{ backgroundColor: todo.color }}
                                        ></span>
                                    )}
                                    <div className="todo-content">
                                        <span className="todo-text">{todo.text}</span>
                                        {expandedIndex === index && todo.description && (
                                            <p className="todo-description">{todo.description}</p>
                                        )}
                                    </div>
                                </>
                            )}
                            <div className='todo-actions'>
                                {editIndex === index ? (
                                    <>
                                        <button 
                                            className="save-button" 
                                            onClick={saveEdit}
                                        >Save</button>
                                        <button 
                                            className="cancel-button" 
                                            onClick={cancelEdit}
                                        >Cancel</button>
                                    </>
                                ) : (
                                    <>  
                                    {todo.dueDate && <span className="todo-date">{todo.dueDate}</span>}
                                        <button 
                                            className="edit-button" 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                editTodo(index);
                                            }}
                                        >✎</button>
                                        <button 
                                            className="complete-button" 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                        >✔</button>
                                        <button 
                                            className="remove-button" 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeTodo(index);
                                            }}
                                        >✖</button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <img src="src/assets/trafficlight.png" alt="Traffic Light" className="traffic-light" />
        </div>
        </>
    );
}

export default Todolist;