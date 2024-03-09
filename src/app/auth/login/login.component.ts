import { Component, Input } from '@angular/core';
import { LoginForm } from '../auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: LoginForm = {
    email: '',
    password: ''
  }
  isPage: number=0;

  constructor(private authService: AuthService) { }

  onUserTypeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.isPage = parseInt(target.value);
  }

  submit() {
    this.authService.login(this.form,this.isPage);
  }
}