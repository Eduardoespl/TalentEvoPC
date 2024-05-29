# TalentEvo

TalentEvo es un sistema de entrenamiento corporativo integrado donde los empleados pueden acceder a cursos para expandir sus conocimientos y habilidades requeridas por la empresa. También cuenta con un panel para recursos humanos para monitorear el progreso de los empleados, los cursos completados, las vacantes existentes y recibir recomendaciones personalizadas sobre los empleados.

## Instrucciones de Instalación y Ejecución

### Requisitos Previos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)
- Cuenta de Firebase para la autenticación y Firestore

### Instalación

1. Clona este repositorio:
    ```bash
    git clone https://github.com/tu-usuario/talentevo.git
    cd talentevo
    ```

2. Instala las dependencias:
    ```bash
    npm install
    ```

3. Crea un archivo `.env` en la raíz del proyecto y agrega tu configuración de Firebase:
    ```plaintext
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    ```

4. Inicia la aplicación en modo desarrollo:
    ```bash
    npm run dev
    ```

5. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Despliegue en Vercel

La aplicación está desplegada en Vercel. Puedes acceder a ella en la siguiente URL: [https://talentevo.vercel.app](https://talentevo.vercel.app)

## Descripción del Proyecto

### Estructura del Proyecto

