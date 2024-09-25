import EmployeeCard from "./employeeCard";
import '../styles/employeeCardStyle.css';

const EmployeeList = () => {
    return (
        <>
            <button className="add-button">
                add employee
            </button>
            <div className="list-title">
                <p>Employee</p>
                <p>Ocupattion</p>
                <p>Phone</p>
                <p>User</p>
                <p>Manage</p>
            </div>
            <div className="list-container">
                <EmployeeCard />
            </div>
        </>
    )
}

export default EmployeeList;