import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService {
  constructor(private authService: AuthService) {}

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isSignedIn = this.authService.isSignedIn();

    if (isSignedIn) {
      const user = this.authService.getUserInLocalStorage();
      const token = user.accessToken;
      req = this.addTokenHeader(req, token);
    }

    return next.handle(req).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !req.url.includes('auth/login') &&
          !req.url.includes('auth/send-verification-email') &&
          error.status === 401
        ) {
          return this.handle401Error(req, next);
        }
        return throwError(error);
      })
    );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const user = this.authService.getUserInLocalStorage();
      const refreshToken = user?.refreshToken;

      if (refreshToken)
        return this.authService.refreshToken(refreshToken).pipe(
          switchMap((data: any) => {
            this.isRefreshing = false;

            const accessToken = data.data.access.token;
            const expiredAccessDate = data.data.access.expires;
            const refreshToken = data.data.refresh.token;
            const expiredRefreshDate = data.data.refresh.expires;

            console.log('NewRefresh Token', refreshToken);
            this.authService.saveUserToLocalStorage({
              ...user,
              accessToken: accessToken,
              expiredAccessDate: expiredAccessDate,
              refreshToken: refreshToken,
              expiredRefreshDate: expiredRefreshDate,
            });

            this.refreshTokenSubject.next(accessToken);

            return next.handle(this.addTokenHeader(request, accessToken));
          }),
          catchError((err) => {
            this.isRefreshing = false;

            this.authService.logout();
            return throwError(err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  addTokenHeader(request: HttpRequest<any>, token: string) {
    const modifiedReq = request.clone({
      headers: request.headers.set('Authorization', `bearer ${token}`),
    });

    return modifiedReq;
  }
}
