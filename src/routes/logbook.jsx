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
            <button 
                className='back-to-list'
                onClick={() => navigate('/')}
            >
            🗒</button>
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
