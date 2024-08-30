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
        const updatedTodos = completedTodo.filter((_, index) => index !== indexToRemove);
        setCompletedTodo(updatedTodos);
        localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(updatedTodos));
    };

    return (
        <>
        <div className="logbook-container">
        <button 
            className='back-to-list'
            onClick={() => navigate('/')}
            >
            🗒</button>
            <h1 className="logbook-title">Logbook</h1>
            <div className="table-container">
                <table className="logbook-table">
                    <thead>
                        <tr>
                            <th>Color</th>
                            <th>Title</th>
                            <th>Completed Date</th>
                            <th>Due Date</th>
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
                                <td className="completed-todo-date">
                                    {new Date(todo.completedDate).toISOString().slice(0, 10)}
                                </td>
                                <td className="completed-todo-date">{todo.dueDate}</td>
                                <td><button 
                                            className="remove-button" 
                                            onClick={(e) => {
                                                removeTodo(index);
                                            }}
                                        >✖</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}

export default Logbook