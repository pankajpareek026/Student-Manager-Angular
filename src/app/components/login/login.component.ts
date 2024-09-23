import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
 
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private auth: AuthService) { }


  login() {

    if (this.email == '') {
      alert("Enter Your Email")
      return;
    }
    if (this.password == '') {
      alert("Enter Your Password")
      return;
    };

    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';


  }

  register() {

    if (this.email == '') {
      alert("enter your Email")
      return;
    }
    if (this.password == '') {
      alert("enter your password");
      return;
    }

    this.auth.register(this.email, this.password);
    this.email = '';
    this.password = '';

  }

  signInWithGoogle() {
    this.auth.signWithGoogle()
  }





}
