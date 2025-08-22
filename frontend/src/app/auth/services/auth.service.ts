import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  AuthState
} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/v1'; // <-- así tu endpoint login será correcto
  private readonly TOKEN_KEY = 'farma_token';
  private readonly USER_KEY = 'farma_user';

  // Estado de autenticación
  private authState = new BehaviorSubject<AuthState>({
    isLoggedIn: false,
    user: null,
    token: null
  });

  public authState$ = this.authState.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadAuthState();
  }

  /**
   * Helper: Saber si estoy en navegador
   */
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  /**
   * Cargar estado de autenticación desde localStorage
   */
  private loadAuthState(): void {
    if (!this.isBrowser()) return;
    const token = localStorage.getItem(this.TOKEN_KEY);
    const userStr = localStorage.getItem(this.USER_KEY);

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.authState.next({
          isLoggedIn: true,
          user,
          token
        });
      } catch (error) {
        this.clearAuthState();
      }
    }
  }

  /**
   * Login de usuario
   */
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/empleados/login`, credentials)
      .pipe(
        tap(response => {
          this.setAuthState(response);
          if (credentials.rememberMe && this.isBrowser()) {
            localStorage.setItem(this.TOKEN_KEY, response.token);
            localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
          }
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Registro de usuario
   */
  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.API_URL}/empleados/register`, userData)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Logout de usuario
   */
  logout(): void {
    // Llamar al endpoint de logout si existe
    this.http.post(`${this.API_URL}/logout`, {}).subscribe({
      complete: () => this.clearAuthState()
    });

    this.clearAuthState();
  }

  /**
   * Verificar si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    return this.authState.value.isLoggedIn;
  }

  /**
   * Obtener usuario actual
   */
  getCurrentUser(): User | null {
    return this.authState.value.user;
  }

  /**
   * Obtener token actual
   */
  getToken(): string | null {
    if (this.authState.value.token) return this.authState.value.token;
    return this.isBrowser() ? localStorage.getItem(this.TOKEN_KEY) : null;
  }

  /**
   * Verificar si el usuario tiene un rol específico
   */
  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }

  /**
   * Refrescar token
   */
  refreshToken(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/refresh`, {})
      .pipe(
        tap(response => this.setAuthState(response)),
        catchError(this.handleError)
      );
  }

  /**
   * Establecer estado de autenticación
   */
  private setAuthState(response: LoginResponse): void {
    this.authState.next({
      isLoggedIn: true,
      user: response.user,
      token: response.token
    });
  }

  /**
   * Limpiar estado de autenticación
   */
  private clearAuthState(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }

    this.authState.next({
      isLoggedIn: false,
      user: null,
      token: null
    });

    this.router.navigate(['/auth/login']);
  }

  /**
   * Manejo de errores
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error inesperado';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = error.error.message;
    } else {
      // Error del lado del servidor
      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Datos inválidos';
          break;
        case 401:
          errorMessage = 'Credenciales inválidas';
          break;
        case 403:
          errorMessage = 'No tienes permisos suficientes';
          break;
        case 404:
          errorMessage = 'Servicio no encontrado';
          break;
        case 500:
          errorMessage = 'Error interno del servidor';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.statusText}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }
}