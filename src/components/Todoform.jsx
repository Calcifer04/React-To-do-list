import React, { useState, useEffect } from 'react';
import '../styles/Todoform.css';

const Todoform = ({ addTodo }) => {
    const [todo, setTodo] = useState('');
    const [description, setDescription] = useState('');
    const [selectedColor, setSelectedColor] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
    };

    const handleInputChange = (e) => {
        setTodo(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dueDate = document.getElementById('duedate').value;
        const assignmentDate = new Date().toISOString().slice(0, 10);
        if (todo.trim()) {
            addTodo({ text: todo, description, color: selectedColor, dueDate, assignmentDate });
            setTodo('');
            setDescription('');
            setIsFormVisible(false);
        }
    };

    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const colors = {
        'light-green': 'rgb(44, 186, 0)',
        'orange': 'rgb(255, 167, 0)',
        'red': 'rgb(255, 0, 0)',
    };

    if (screenSize.width < 1100) {
        return (
            <div className={`form-container ${isFormVisible ? 'expanded' : 'collapsed'}`}>
                <div onClick={toggleFormVisibility}>
                    {isFormVisible ? 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class='collapse-button'>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                    </svg>
                    : 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class='expand-button'>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    }
                </div>
                {isFormVisible && (
                    <div>
                        <h2>Add New To-Do:</h2>
                        <form onSubmit={handleSubmit} className="todo-form">
                            <input 
                                type="text" 
                                value={todo} 
                                onChange={handleInputChange} 
                                placeholder="Title" 
                                className="todo-input"
                            />
                            <textarea
                                type="text"
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Description/notes"
                                className='description-input'>
                            </textarea>
                            <h3>Select Due Date:</h3>
                            <input className='date-picker' type="date" id="duedate" name="duedate"></input>
                            <h3>Select:</h3>
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
                )}
            </div>
        );
    } else {
        return (
            <div className='form-container'>
                <h2>Add New To-Do:</h2>
                <form onSubmit={handleSubmit} className="todo-form">
                    <input 
                        type="text" 
                        value={todo} 
                        onChange={handleInputChange} 
                        placeholder="Title" 
                        className="todo-input"
                    />
                    <textarea
                        type="text"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Description/notes"
                        className='description-input'>
                    </textarea>
                    <h3>Select Due Date:</h3>
                    <input className='date-picker' type="date" id="duedate" name="duedate"></input>
                    <h3>Select:</h3>
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
    }
};

export default Todoform;
