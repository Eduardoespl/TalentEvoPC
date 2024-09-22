import '../styles/employeeCardStyle.css';
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';

const EmployeeCard = () => {
    return (
        <>
            <div className="employee-card">
                <p className="employee-name">Natalia Cásares</p>
                <p className="employee-data">Doctora</p>
                <p className="employee-data">+52 312-111-2222</p>
                <p className="employee-data">ncasares</p>
                <div className='icon-container'>
                    <FaEdit className='icon edit' />
                    <p style={{ fontSize: '40px', color: 'white', opacity: '0.5' }}>|</p>
                    <FaRegTrashAlt className='icon trash' />
                </div>
            </div>
        </>
    )
}

export default EmployeeCard;