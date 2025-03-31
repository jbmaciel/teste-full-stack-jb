import { Injectable } from '@angular/core';
import { delay, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private validUser = { email: 'usuario@email.com', password: '123456' };

  login(email: string, password: string) {
    if (email === this.validUser.email && password === this.validUser.password) {
      return of({ success: true }).pipe(delay(5000)); // Simula requisição assíncrona
    } else {
      return throwError(() => new Error('Senha ou usuário incorretos, revise suas credenciais!')).pipe(delay(1000));
    }
  }
}
