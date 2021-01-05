import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`${request.method} ${request.url}`);
    return next.handle(request)
      .pipe(
        retry(0),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          console.error(error);
          if (error.status === 302 || error.status === 0 
              || error.statusText.indexOf('Unknown') >= 0 || error.url.indexOf('/oauth2/authorization/google') > 1) {
            console.error('Sesion perdida');
            this.router.navigateByUrl('/login');
          }
          if (error.status === 401 || error.status === 403) {
              console.error('Unauthorized request');
              this.router.navigateByUrl('/register');
          }
          if(error.url.indexOf('/exit') > 1){
            window.location.href = "https://mail.google.com/mail/u/0/?logout&hl=en";
          }

          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            errorMessage = (error.error !== undefined) ? error.error.message : error.message;
          }
          return throwError(errorMessage);
        })
      )
  }
}