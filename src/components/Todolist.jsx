import React, { useState, useEffect } from 'react';
import '../styles/Todolist.css';
import Todoform from './Todoform';

const LOCAL_STORAGE_KEY = 'todos';

const Todolist = () => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

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

    return (
        <div className="todo-container">
            <Todoform addTodo={addTodo} />
            <div className="todo-list">
                <h1>To-Do List:</h1>
                <ul>
                    {todos.map((todo, index) => (
                        <li key={index} className="todo-item">
                            {todo.color && (
                                <span
                                    className="color-indicator"
                                    style={{ backgroundColor: todo.color }}
                                ></span>
                            )}
                            <span className="todo-text">{todo.text}</span>
                            {todo.dueDate && <span className="todo-date">{todo.dueDate}</span>}
                            <button className="remove-button" onClick={() => removeTodo(index)}>✖</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Todolist;