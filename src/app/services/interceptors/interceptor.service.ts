import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders({
      Authorization: localStorage.getItem('currentUser') ? `Bearer ${JSON.parse(localStorage.getItem('currentUser')!).accessToken}` : ''
    });

    const reqClone = req.clone({
      headers
    });
    return next.handle(reqClone).pipe(
      catchError(error => {
        if (error && error instanceof HttpErrorResponse) {
          if (error.status === 401 || error.error.statusCode == 401) {
            Swal.fire({ icon: 'error', title: 'Token expirado' }).then(res => {
              localStorage.clear();
              this.router.navigateByUrl('/login');
              return throwError(error);
            });
          } else {
            return throwError(error);
          }
        }
        console.error("error is intercept", error);
        return throwError(error.message);
      })
    );
  }
}
