import VacancieCard from './components/vacancieCard';
import './styles/employeeCardStyle.css';
import AddVacancieModal from './components/addVacancieModal';
import { useState } from 'react';

const Vacancies = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    
    return (
        <>
            <button className="add-button" onClick={openModal}>
                agregar vacante
            </button>
            <div className="list-container">
                <VacancieCard />
            </div>
            <AddVacancieModal isOpen={isModalOpen} onClose={closeModal} />
        </>
    )
}

export default Vacancies;