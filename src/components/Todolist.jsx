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
    const [editDescription, setEditDescription] = useState('')
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
        const confirmation = window.confirm('Are you sure you want to complete & log this item?');
        if (confirmation) {
            const completedTodo = todos[index];
            const updatedTodos = todos.filter((_, i) => i !== index);
            setTodos(updatedTodos);
            updateLocalStorage(updatedTodos, TODO_STORAGE_KEY);

            const completedTodos = JSON.parse(localStorage.getItem(COMPLETED_STORAGE_KEY) || '[]');
            completedTodos.push({...completedTodo, completedDate: new Date().toISOString()});
            updateLocalStorage(completedTodos, COMPLETED_STORAGE_KEY);
        }
    };

    const editTodo = (index) => {
        const todo = todos[index];
        setEditIndex(index);
        setEditText(todo.text);
        setEditDescription(todo.description);
        setEditColor(todo.color || colorOptions[0]);
        setEditDate(todo.dueDate || '');
    };

    const saveEdit = () => {
        if (editIndex !== null) {
            const updatedTodos = todos.map((todo, i) =>
                i === editIndex ? { ...todo, text: editText, description: editDescription, color: editColor, dueDate: editDate } : todo
            );
            setTodos(updatedTodos);
            updateLocalStorage(updatedTodos);
            setEditIndex(null);
            setEditText('');
            setEditDescription('');
            setEditColor('');
            setEditDate('');
        }
    };
    
    const cancelEdit = () => {
        setEditIndex(null);
        setEditText('');
        setEditDescription('');
        setEditColor('');
        setEditDate('');
    };
    
    const toggleDescription = (index) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const sortByDueDate = () => {
        let isAscending = true;

        for (let i = 1; i < todos.length; i++) {
            const prevDate = Date.parse(new Date(todos[i-1].dueDate.split("/").reverse().join("-")));
            const currDate = Date.parse(new Date(todos[i].dueDate.split("/").reverse().join("-")));
            if (prevDate > currDate) {
                isAscending = false;
                break;
            }
        }
    
        const sortedTodos = [...todos].sort((a, b) => {
            const aDate = Date.parse(new Date(a.dueDate.split("/").reverse().join("-")));
            const bDate = Date.parse(new Date(b.dueDate.split("/").reverse().join("-")));
            return isAscending ? bDate - aDate : aDate - bDate;
        });
    
        setTodos(sortedTodos);
        updateLocalStorage(sortedTodos, TODO_STORAGE_KEY);
    };

    const sortByAssignmentDate = () => {
        let isAscending = true;

        for (let i = 1; i < todos.length; i++) {
            const prevDate = Date.parse(new Date(todos[i-1].assignmentDate.split("/").reverse().join("-")));
            const currDate = Date.parse(new Date(todos[i].assignmentDate.split("/").reverse().join("-")));
            if (prevDate > currDate) {
                isAscending = false;
                break;
            }
        }
    
        const sortedTodos = [...todos].sort((a, b) => {
            const aDate = Date.parse(new Date(a.assignmentDate.split("/").reverse().join("-")));
            const bDate = Date.parse(new Date(b.assignmentDate.split("/").reverse().join("-")));
            return isAscending ? bDate - aDate : aDate - bDate;
        });
    
        setTodos(sortedTodos);
        updateLocalStorage(sortedTodos, TODO_STORAGE_KEY);
    };

    const colorOrder = ['rgb(255, 0, 0)', 'rgb(255, 167, 0)', 'rgb(44, 186, 0)'];

    const sortByColor = () => {
        let isAscending = true;
    
        for (let i = 1; i < todos.length; i++) {
            const prevColor = colorOrder.indexOf(todos[i-1].color);
            const currColor = colorOrder.indexOf(todos[i].color);
            if (prevColor > currColor) {
                isAscending = false;
                break;
            }
        }
    
        const sortedTodos = [...todos].sort((a, b) => {
            const colorA = colorOrder.indexOf(a.color);
            const colorB = colorOrder.indexOf(b.color);
            return isAscending ? colorB - colorA : colorA - colorB;
        });
    
        setTodos(sortedTodos);
        updateLocalStorage(sortedTodos, TODO_STORAGE_KEY);
    };

    return (
        <>
        <svg 
            class='logbook'
            onClick={() => navigate('/logbook')}
            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
        <div className="todo-container">
            <Todoform addTodo={addTodo} />
            <div className="dropdown">
                <button class="dropbtn">
                    <span className="filter">Filter</span>
                    <svg class="funnel" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                    </svg>
                    </button>
                <div class="dropdown-content">
                    <a onClick={sortByDueDate}>Due Date</a>
                    <a onClick={sortByAssignmentDate}>Assignment Date</a>
                    <a onClick={sortByColor}>Color</a>
                </div>
            </div>
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
                                    <div className="edit-content">
                                        <input
                                            className='edit-title'
                                            type="text"
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            placeholder="To-Do title"
                                            autoFocus
                                        />
                                        <textarea
                                            className='edit-description'
                                            type="text"
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                            placeholder="Description/notes">
                                        </textarea>
                                        <input
                                            className='edit-date'
                                            type="date"
                                            value={editDate}
                                            onChange={(e) => setEditDate(e.target.value)}
                                        />
                                    </div>
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
                                        {expandedIndex === index && todo.assignmentDate && (
                                            <>
                                            <p className="todo-description">{todo.description}</p>
                                            <p className="todo-assigned-label">Assigned:</p>
                                            <p className="todo-assigned-date">{todo.assignmentDate}</p>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                            <div className='todo-actions'>
                                {editIndex === index ? (
                                    <div className='edit-save-cancel'>
                                        <button 
                                            className="save-button" 
                                            onClick={saveEdit}
                                        >Save</button>
                                        <button 
                                            className="cancel-button" 
                                            onClick={cancelEdit}
                                        >Cancel</button>
                                    </div>
                                ) : (
                                    <>  
                                    {todo.dueDate && <span className="todo-date">{todo.dueDate}</span>}
                                        <svg  
                                        
                                            class="edit-button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                editTodo(index);
                                            }}
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                        <svg 
                                        
                                            class="complete-button" 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                completeTodo(index);
                                            }}
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                        </svg>
                                        <svg
                                            class="remove-button" 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeTodo(index);
                                            }}
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
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