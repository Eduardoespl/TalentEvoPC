// hooks/useVacantes.ts
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

interface Vacante {
  id: string;
  titulo: string;
  curso: string; // Agregar esta línea
  empleado: string | null; // Aquí se agrega el campo empleado, que puede ser un ID de empleado o null
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
          ...doc.data(),
        } as Vacante));

        // Filtrar vacantes que no tienen empleado asignado (empleado es null o no existe)
        const vacantesSinEmpleado = vacantesData.filter(vacante => !vacante.empleado);
        setVacantes(vacantesSinEmpleado);
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
