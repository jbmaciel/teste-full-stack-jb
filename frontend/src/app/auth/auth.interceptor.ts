import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Injeta o AuthService
  const token = localStorage.getItem('access_token');

  if (token) {
    // Verifica se o token está expirado
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();

    if (isExpired) {
      // Renova o token antes de continuar
      return authService.refreshToken().pipe(
        switchMap(() => {
          const newToken = localStorage.getItem('access_token');
          if (newToken) {
            req = req.clone({
              setHeaders: { Authorization: `Bearer ${newToken}` },
            });
          }
          return next(req);
        }),
        catchError((err) => {
          authService.logout(); // Desconecta o usuário se a renovação falhar
          return throwError(() => err);
        })
      );
    }

    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        // Tenta renovar o token
        return authService.refreshToken().pipe(
          switchMap(() => {
            const newToken = localStorage.getItem('access_token');
            if (newToken) {
              req = req.clone({
                setHeaders: { Authorization: `Bearer ${newToken}` },
              });
            }
            return next(req);
          }),
          catchError((err) => {
            authService.logout(); // Desconecta o usuário se a renovação falhar
            return throwError(() => err);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
