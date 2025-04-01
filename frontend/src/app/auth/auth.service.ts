import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, delay, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private apiUrl = 'http://localhost:8000';
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  private grant_type = 'password';
  private client_id = '2'; // ID do cliente OAuth2
  private client_secret = 'dSpWb3X9Mb8hDXCY81HAViiHBlU6TbyxjFXQFDxc'; // Segredo do cliente OAuth2
  private scope = '*'; // Escopo de acesso (opcional)

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<{ access_token: string, refresh_token: string }>(
      `${this.apiUrl}/oauth/token`,
      {
        'grant_type': this.grant_type,
        'client_id': this.client_id,
        'client_secret': this.client_secret,
        'scope': this.scope,
        'username': email,
        'password': password
      }
    ).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
        this.loadUser(); // "Carrega" o usuário após o login
      }),
      catchError(error => {
        console.error('Erro de login:', error);
        if (error.status === 401) {
          return throwError(() => new Error('Senha ou usuário incorretos, revise suas credenciais!'));
        }
        return throwError(() => new Error('Senha ou usuário incorretos, revise suas credenciais!'));
        // return throwError(() => new Error('Ops.. Algo não está funcionando por aqui! Tente novamente mais tarde!'));
      })
    );
  }

  loadUser() {
    const token = localStorage.getItem('access_token');
    if (!token) return;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(`${this.apiUrl}/api/user`, { headers }).subscribe(user => {
      this.userSubject.next(user); // Atualiza o estado do usuário
    });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now(); // Verifica se o token está expirado
      return !isExpired;
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
      return false;
    }

  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (!refreshToken) {
      return throwError(() => new Error('Refresh token não encontrado'));
    }

    return this.http.post<{ access_token: string, refresh_token: string }>(
      `${this.apiUrl}/oauth/token`,
      {
        grant_type: 'refresh_token',
        client_id: this.client_id,
        client_secret: this.client_secret,
        refresh_token: refreshToken
      }
    ).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);
      }),
      catchError(error => {
        console.error('Erro ao atualizar o token:', error);
        if (error.status === 401) {
          this.logout(); // Logout se o refresh token não for válido
          return throwError(() => new Error('Sessão expirada. Faça login novamente.'));
        }
        return throwError(() => new Error('Erro ao atualizar o token.'));
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.userSubject.next(null);
  }
}
