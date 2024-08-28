import React, { useState, useEffect } from 'react';
import '../styles/Todolist.css';
import { useNavigate } from 'react-router-dom';
import Todoform from './Todoform';
import ColorDropdown from './ColorDropdown';

const TODO_STORAGE_KEY = 'todos';
const COMPLETED_STORAGE_KEY = 'completed_todos';

const Todolist = () => {
    const navigate = useNavigate();

    const [todos, setTodos] = useState([]);
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
        const local_todos = localStorage.getItem(TODO_STORAGE_KEY);
        if (local_todos) {
            setTodos(JSON.parse(local_todos))
        }
    }, []);

    const updateLocalStorage = (todos, key) => {
        localStorage.setItem(key, JSON.stringify(todos));
    };

    const addTodo = (newTodo) => {
        const updatedTodos = [...todos, newTodo];
        setTodos(updatedTodos);
        updateLocalStorage(updatedTodos, TODO_STORAGE_KEY);
    };

    const removeTodo = (index) => {
        const confirmation = window.confirm('Are you sure you want to delete this item?');
        if (confirmation) {
            const updatedTodos = todos.filter((_, i) => i !== index);
            setTodos(updatedTodos);
            updateLocalStorage(updatedTodos, TODO_STORAGE_KEY);
        }
    };

    const completeTodo = (index) => {
        const completedTodo = todos[index];
        const updatedTodos = todos.filter((_, i) => i !== index);
        setTodos(updatedTodos);
        updateLocalStorage(updatedTodos, TODO_STORAGE_KEY);

        const completedTodos = JSON.parse(localStorage.getItem(COMPLETED_STORAGE_KEY) || '[]');
        completedTodos.push({...completedTodo, completedDate: new Date().toISOString()});
        updateLocalStorage(completedTodos, COMPLETED_STORAGE_KEY);
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
            updateLocalStorage(updatedTodos);
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
                    {todos.map((todo, index) => (
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
                                        placeholder="To-Do title"
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
                                                completeTodo(index);
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