import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserManager, User } from 'oidc-client';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from './cart.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
 
@Injectable({providedIn: 'root'})
export class AuthService {
 
    public user: User;
    private userManager: UserManager;
    username: string = "";
    private registerUrl = 'https://localhost:5000';
 
    constructor(private CookieService: CookieService, private cartService: CartService, private http: HttpClient) {
        this.userManager = new UserManager({
            authority: environment.authority,
            client_id: environment.clientId,
            redirect_uri: environment.redirectUri,
            response_type: environment.responseType,
            scope: environment.scope
        });
    }
 
    login() {
        console.log("auth login");
        return this.userManager.signinRedirect();
    }
 
    async completeAuthentication() {
        const dateNow = new Date();
        dateNow.setMinutes(dateNow.getMinutes() + 120);
        this.CookieService.set('cookie_isAuth', '1', dateNow);
        this.user = await this.userManager.signinRedirectCallback();
        this.username = this.user.profile.name;
    }

    isAuthenticated(): boolean {
        return this.user != null && !this.user.expired;
    }

    signout() {
        const dateNow = new Date();
        dateNow.setMinutes(dateNow.getMinutes() + 120);
        this.CookieService.set('cookie_isAuth', '0', dateNow);
        this.userManager.signoutRedirect();
    }

    Register(username: string, password: string): Observable<void> {
        return this.http.get<void>(`${this.registerUrl}/${username}/${password}`).
        pipe(catchError(this.cartService.handleError));
    }
}