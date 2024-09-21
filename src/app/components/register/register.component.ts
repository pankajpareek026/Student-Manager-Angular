import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private auth: AuthService) { }

  email: string = '';
  password: string = '';

  register() {
    if(this.email==''){
      alert("Enter your Email")
      return;
    }
    if(this.password==''){
      alert("Enter your password")
      return;
    }
    this.auth.register(this.email, this.password);
  }

  



}
