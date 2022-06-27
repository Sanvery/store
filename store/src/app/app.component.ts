import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from './shared/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { AppService } from './shared/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  username: string = "Sign in";
  popupVisible = false;
  popupVisibleOut = false;

  constructor(private router: Router, private titleService: Title, private authService: AuthService,
    private CookieService: CookieService, private appService: AppService) {
    titleService.setTitle("Main page");
    this.router.navigate(['/home']);
    if (authService.username != "")
      this.username = "User: " + authService.username;
  }

  selectionChanged(e) {
    switch(e.itemIndex) {
      case 0:
        this.router.navigate(['/home']);
        break;
      case 1:
        this.router.navigate(['/catalog']);
        break;
      case 2:
        this.router.navigate(['/order']);
        break;
      case 5:
        this.router.navigate(['/cart']);
        break;
      case 6:
        let cookieAuth = this.CookieService.get('cookie_isAuth');
        if (cookieAuth == '1') {
          this.dialogOut();
        }
        else {
          this.dialogRegister();
        }
        break;
      default:
        this.router.navigate(['/home']);
        this.titleService.setTitle("Main page");
        break;
    }
  }

  dialogRegister() {
    this.popupVisible = true;
  }

  onLoginClicked() {
    this.appService.sign_in = true;   
    this.appService.initApp();
    this.popupVisible = false;
  }

  onRegisterClicked() {
    this.router.navigate(['/register']);
    this.popupVisible = false;
  }

  dialogOut() {
    this.popupVisibleOut = true;
  }

  LogOutYes() {
    this.popupVisibleOut = false;
    this.authService.signout();
  }

  LogOutNo() {
    this.popupVisibleOut = false;
  }
}
