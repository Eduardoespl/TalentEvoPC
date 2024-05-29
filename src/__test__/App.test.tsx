import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../Login';
import Register from '../Register';
import Dashboard from '../Dashboard';
import CompletedCourses from '../components/completedCourses';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';

// Mock de Firebase Auth
vi.mock('firebase/auth', () => ({
    createUserWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
}));

vi.mock('../firebase/config', () => ({
    auth: vi.fn(),
}));

describe('Login', () => {
    test('should render login form', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
        expect(screen.getByText('Talent')).toBeInTheDocument();
        expect(screen.getByText('Evo')).toBeInTheDocument();
        expect(screen.getByText('Correo electrónico')).toBeInTheDocument();
        expect(screen.getByText('Contraseña')).toBeInTheDocument();
        expect(screen.getByText('No tengo una cuenta')).toBeInTheDocument();
        expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
    });

    test('allows user to type email and password', () => {
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
        const emailInput = screen.getByPlaceholderText('Correo electrónico');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password');
    });
});

describe('Register', () => {
    test('should render login form', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
        expect(screen.getByText('Talent')).toBeInTheDocument();
        expect(screen.getByText('Evo')).toBeInTheDocument();
        expect(screen.getByText('Correo')).toBeInTheDocument();
        expect(screen.getByText('Contraseña')).toBeInTheDocument();
        expect(screen.getByText('Registrarse')).toBeInTheDocument();
    });

    test('allows user to type email and password', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );
        const emailInput = screen.getByPlaceholderText('Correo');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        expect(emailInput).toHaveValue('test@example.com');
        expect(passwordInput).toHaveValue('password');
    })

    test('should call createUserWithEmailAndPassword when user submits form', () => {
        render(
            <BrowserRouter>
                <Register />
            </BrowserRouter>
        );

        const emailInput = screen.getByPlaceholderText('Correo');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const button = screen.getByText('Registrarse');
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
        fireEvent.click(button);
        expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    });
});

describe('Dashboard', () => {
    test('should render dashboard', () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Numero de vistas por curso')).toBeInTheDocument();
    });

    test('should call signOut when user clicks on logout button', () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );
        const button = screen.getByText('Logout');
        fireEvent.click(button);
        expect(signOut).toHaveBeenCalled();
    });

    test('render all components', () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );
        expect(screen.getByText('Dashboard')).toBeInTheDocument();
        expect(screen.getByText('Numero de vistas por curso')).toBeInTheDocument();
        expect(screen.getByText('Vacantes')).toBeInTheDocument();
        expect(screen.getByText('Empleados')).toBeInTheDocument();
    });

    test('should render CompletedCourses component', () => {
        render(
            <BrowserRouter>
                <CompletedCourses />
            </BrowserRouter>
        );
        expect(screen.getByText('Cursos Completados')).toBeInTheDocument();
    });
});
