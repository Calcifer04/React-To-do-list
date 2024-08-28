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

    return (
        <>
        <button 
            className='back-to-list'
            onClick={() => navigate('/')}
            >
            🗒</button>
        <div className="header">
            <h1 className="logbook-title">Logbook</h1>
        </div>
        <ul>
            {completedTodo.map((todo, index) => (
                <li key={index} className="completed-todo-item">
                    <span className="completed-todo-text">{todo.text}</span>
                    <span className="completed-todo-date">
                        Completed: {new Date(todo.completedDate).toLocaleString()}
                    </span>
                </li>
            ))}
        </ul>
        </>
    );
}

export default Logbook