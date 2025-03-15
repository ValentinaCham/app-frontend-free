import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ErrorsService } from '../services/errors.service';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  //return next(req);
  const _errorService = inject(ErrorsService);
  const router = inject(Router);

  console.log('Interceptor');

  const token = localStorage.getItem('token');
  if (token) {
    console.log('Token: ', token);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    if (error.status === 401) {
      console.log('Error 401');
      _errorService.messageError(error);
      router.navigate(['/login']);
    }
    return throwError(() => error);
  }));
};
