import "../styles/logbook.css"
import { useNavigate } from 'react-router-dom';

function Logbook() {
    const navigate = useNavigate();

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
        </>
    );
}

export default Logbook