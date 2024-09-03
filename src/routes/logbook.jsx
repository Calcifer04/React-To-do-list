import "../styles/logbook.css"
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";

const COMPLETED_STORAGE_KEY = 'completed_todos';

function Logbook() {
    const navigate = useNavigate();
    const [completedTodo, setCompletedTodo] = useState([]);

    useEffect(() => {
        const local_completed = localStorage.getItem(COMPLETED_STORAGE_KEY);
        if (local_completed) {
            setCompletedTodo(JSON.parse(local_completed))
        }
    }, []);

    const removeTodo = (indexToRemove) => {
        const confirmation = window.confirm('Are you sure you want to delete this item?');
        if (confirmation) {
        const updatedTodos = completedTodo.filter((_, index) => index !== indexToRemove);
        setCompletedTodo(updatedTodos);
        localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(updatedTodos));
    }};

    return (
        <div className="logbook-container">
            <svg
                class='back-to-list'
                onClick={() => navigate('/')}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <h1 className="logbook-title">Logbook</h1>
            <div className="table-container">
                {completedTodo.length === 0 ? (
                    <p className="no-todos-message">No To-Do's have been completed.</p>
                ) : (
                    <table className="logbook-table">
                        <thead>
                            <tr>
                                <th>Color</th>
                                <th>Title</th>
                                <th>Assigned</th>
                                <th>Due</th>
                                <th>Completed</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {completedTodo.map((todo, index) => (
                                <tr key={index} className="completed-todo-item">
                                    <td>
                                        <div className="color-circle-container">
                                            <div 
                                                className="completed-color-circle" 
                                                style={{ backgroundColor: todo.color }}
                                            ></div>
                                        </div>
                                    </td>
                                    <td className="completed-todo-text">{todo.text}</td>
                                    <td className="completed-todo-date">{todo.assignmentDate}</td>
                                    <td className="completed-todo-date">{todo.dueDate}</td>
                                    <td className="completed-todo-date">
                                        {new Date(todo.completedDate).toISOString().slice(0, 10)}
                                    </td>
                                    <td>
                                        <button 
                                            className="remove-button" 
                                            onClick={() => removeTodo(index)}
                                        >✖</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <img src="src/assets/trafficlight.png" alt="Traffic Light" className="traffic-light" />
        </div>
    );
}

export default Logbook;
