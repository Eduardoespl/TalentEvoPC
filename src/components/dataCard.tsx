import '../styles/cardsStyles.css';
import { IconType } from 'react-icons';

interface cardProps {
    number: number;
    label: string;
    icon: IconType;
}

const DataCard = ({ number, label, icon:Icon }: cardProps) => {
    return (
        <div className='container'>
            <div>
                <Icon size={100} style={{color: 'white'}}/>
            </div>
            <div className='data'>
                <h1>{number}</h1>
                <p>{label}</p>
            </div>
        </div>
    );
};

export default DataCard;