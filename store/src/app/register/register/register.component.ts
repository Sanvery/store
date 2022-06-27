import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { AppService } from '../../shared/app.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(private titleService: Title, private appService: AppService,
    private authService: AuthService, private router: Router) {
    titleService.setTitle("Registration");
  }

  onAccountCreate() {
    console.log(this.username, this.password);
    if (this.username == "" || this.password == "" || this.confirmPassword == "") {
      notify("Login or password cannot be empty!");
    }
    if (this.password != this.confirmPassword) {
      notify("Passwords do not match!");
    }
    else {
      this.appService.sign_in = true;
      this.authService.Register(this.username, this.password).subscribe(
        res => {
          notify(`User ${this.username} was successfully registered!`);
        },
        err => {
          console.log(err);
          notify(`User ${this.username} already exists!`);
        }
      );
      this.router.navigate(['/home']);
    }
  }

  onEnterKey(){
    this.onAccountCreate();
  }
}
