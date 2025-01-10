import './style.css';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthResponse {
    token: string;
    user: User;
}

const API_URL = import.meta.env.VITE_API_URL;

let currentUser: User | null = null;

// Funktion til at tjekke om brugeren er på en auth-side
function isAuthPage(): boolean {
    return window.location.pathname === '/' || 
           window.location.pathname === '/login.html' || 
           window.location.pathname === '/register.html';
}

// Funktion til at håndtere login
async function handleLogin(email: string, password: string) {
    try {
        console.log('Forsøger at logge ind...');
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        console.log('Server svar status:', response.status);
        const contentType = response.headers.get('content-type');
        console.log('Content-Type:', contentType);

        if (!response.ok) {
            let errorMessage: string;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || 'Der skete en fejl ved login';
            } catch (e) {
                console.error('Kunne ikke parse fejlbesked:', e);
                errorMessage = 'Der skete en uventet fejl ved login';
            }
            throw new Error(errorMessage);
        }

        const data: AuthResponse = await response.json();
        currentUser = data.user;
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/calculator.html';
    } catch (error) {
        console.error('Login fejl:', error);
        alert(error instanceof Error ? error.message : 'Der skete en fejl ved login');
    }
}

// Funktion til at håndtere registrering
async function handleRegister(name: string, email: string, password: string, passwordConfirm: string) {
    try {
        // Validering
        if (!name || !email || !password || !passwordConfirm) {
            throw new Error('Alle felter skal udfyldes');
        }
        
        if (password !== passwordConfirm) {
            throw new Error('Adgangskoderne matcher ikke');
        }

        if (password.length < 8) {
            throw new Error('Adgangskoden skal være mindst 8 tegn lang');
        }

        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Der skete en fejl ved registrering');
        }

        const data: AuthResponse = await response.json();
        currentUser = data.user;
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.location.href = '/calculator.html';
    } catch (error) {
        alert(error instanceof Error ? error.message : 'Der skete en fejl ved registrering');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Tjek om brugeren allerede er logget ind
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
        currentUser = JSON.parse(storedUser);
        if (isAuthPage()) {
            window.location.href = '/calculator.html';
        }
    } else if (!isAuthPage()) {
        window.location.href = '/login.html';
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = (document.getElementById('loginEmail') as HTMLInputElement).value;
            const password = (document.getElementById('loginPassword') as HTMLInputElement).value;
            await handleLogin(email, password);
        });
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    registerForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = (document.getElementById('registerName') as HTMLInputElement).value;
        const email = (document.getElementById('registerEmail') as HTMLInputElement).value;
        const password = (document.getElementById('registerPassword') as HTMLInputElement).value;
        const passwordConfirm = (document.getElementById('registerPasswordConfirm') as HTMLInputElement).value;
        handleRegister(name, email, password, passwordConfirm);
    });

    // Logout button
    const logoutButton = document.getElementById('logoutButton');
    logoutButton?.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login.html';
    });

    // Vis brugerens email i navigationen hvis logget ind
    const userEmail = document.getElementById('userEmail');
    if (userEmail && currentUser) {
        userEmail.textContent = currentUser.email;
    }
}); 