import '../styles/cardsStyles.css';
import { IconType } from 'react-icons';

interface cardProps {
    number: number;
    label: string;
    details?: number;
    extraInfo?: string;
    icon: IconType;
}

const DataCard = ({ number, label, icon:Icon, details, extraInfo }: cardProps) => {
    return (
        <div className='container'>
            <div>
                <Icon size={100} style={{color: 'white'}}/>
                <p>{label}</p>
            </div>
            <div className='data'>
                <h1>{number}</h1>
                <p style={{fontSize:"15px"}}>{extraInfo}{details}</p>
            </div>
        </div>
    );
};

export default DataCard;