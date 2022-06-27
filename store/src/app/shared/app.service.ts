import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({providedIn: 'root'})
export class AppService {

    sign_in: boolean = false;

    constructor(
        private authService: AuthService, private CookieService: CookieService) { }

    initApp(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            if (!this.authService.isAuthenticated()) {
                if (window.location.href.indexOf('id_token') >= 0) {
                    await this.authService.completeAuthentication();
                    resolve();
                } else if (window.location.href.indexOf('error') >= 0) {
                    reject();
                }
                else {
                    if (this.CookieService.get('cookie_isAuth') == '1' || this.sign_in == true) {
                        this.sign_in = false;
                        return this.authService.login();
                    }
                    else {
                        resolve();
                    }
                }
            }
        });
   }
}
