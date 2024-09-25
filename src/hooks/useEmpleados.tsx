import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import {db} from '../firebase/config';

interface Empleado {
  id: string;
  nombre: string;
  apellido: string;
  posicion: string;
  phone: number;
  user: string;
  // Otros campos según la estructura de tu colección 'vacantes'
}

const useEmpleados = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacantes = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'empleados'));
        const empleadosData: Empleado[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Empleado));
        setEmpleados(empleadosData);
      } catch (error) {
        console.error("Error fetching vacantes: ", error);
      }
      setLoading(false);
    };

    fetchVacantes();
  }, []);

  return { empleados, loading };
};

export default useEmpleados;
