export interface User {
  id: number;
  usuario: string;  // Campo del backend
  nombre: string;   // Campo del backend
  role?: 'admin' | 'employee' | 'user';
}

export interface LoginRequest {
  usuario: string;    // Campo del backend
  contrasena: string; // Campo del backend
  rememberMe?: boolean;
}

export interface LoginResponse {
  token: string;
  refreshToken?: string;
  user: User;
  expiresIn: number;
}

export interface RegisterRequest {
  nombre: string;     // Campo del backend
  usuario: string;    // Campo del backend
  contrasena: string; // Campo del backend
  confirmPassword: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

// Para el servicio
export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
}