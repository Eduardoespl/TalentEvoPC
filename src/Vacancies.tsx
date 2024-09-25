import VacancieCard from './components/vacancieCard';
import './styles/employeeCardStyle.css';

const Vacancies = () => {
    return (
        <>
            <button className="add-button">
                add vacancie
            </button>
            <div className="list-container">
                <VacancieCard />
            </div>
        </>
    )
}

export default Vacancies;