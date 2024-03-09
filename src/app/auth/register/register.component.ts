import { Component } from '@angular/core';
import { RegisterForm } from '../auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form: RegisterForm = {
    email: '',
    password: '',
    comfirm_password: ''
  }
  isPage:number =0
  constructor(private authService: AuthService) { }
  onUserTypeChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.isPage = parseInt(target.value);
  }

  submit() {
    this.authService.register(this.form,this.isPage)
  }
}