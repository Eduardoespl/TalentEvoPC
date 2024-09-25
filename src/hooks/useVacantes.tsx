// hooks/useVacantes.ts
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import {db} from '../firebase/config';

interface Vacante {
  id: string;
  titulo: string;
  // Otros campos según la estructura de tu colección 'vacantes'
}

const useVacantes = () => {
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacantes = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'vacantes'));
        const vacantesData: Vacante[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Vacante));
        setVacantes(vacantesData);
      } catch (error) {
        console.error("Error fetching vacantes: ", error);
      }
      setLoading(false);
    };

    fetchVacantes();
  }, []);

  return { vacantes, loading };
};

export default useVacantes;
