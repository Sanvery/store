import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
 
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
 
    constructor(
        private authService: AuthService, private cookieService: CookieService) {}
 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.cookieService.get('cookie_isAuth') == '1') {
            const headers = req.headers
            .set('Content-Type', 'application/json')
            .set('Authorization', `${this.authService.user.token_type}  ${this.authService.user.access_token}`);
            const authReq = req.clone({ headers });
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}
