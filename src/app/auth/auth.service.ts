// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { LoginForm, RegisterForm } from './auth';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   isAuthenticated: boolean = false
//   isloading: boolean = false
//   constructor(private router: Router) { }
//   Users: any[] = [
//     {
//       email: 'itc.edu@gmail.com',
//       password: '123456789'
//     }
//   ]
//   login(form: LoginForm) {
//     if (form.email = this.Users[0].email && form.password == this.Users[0].password) {
//       this.isAuthenticated = true
//       this.router.navigate([''])
//     } else {
//       alert('login not success')
//       this.isAuthenticated = false
//     }
//   }
//   register(form: RegisterForm) {
//     if (form.password != form.comfirm_password) {
//       return
//     }
//     else {
//       this.Users.push(form)
//       this.router.navigate([''])
//       this.isAuthenticated = true
//     }
//     console.log(this.Users)
//   }
//   logout() {
//     this.router.navigate([''])
//     this.isAuthenticated = false
//   }
// }

import { Injectable } from '@angular/core';
import { LoginForm, RegisterForm } from './auth';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated: boolean = false
  isloading: boolean = false
  constructor(private router: Router, private http: HttpClient) { }
  private URL = `http://localhost:3000/LoginUsers`
  getLogin(): Observable<LoginForm[]> {
    return this.http.get<LoginForm[]>(`${this.URL}`)
  }
  protected LoginUsers: LoginForm[] =[]
  login(form: LoginForm) {
    this.getLogin().subscribe((users: LoginForm[]) => {
      const user = users.find(u => u.email === form.email && u.password === form.password);
      if (user) {
        this.isAuthenticated = true;
        this.router.navigate(['list']);
        alert('Login success');
      } else {
        alert('Login not successful');
        this.isAuthenticated = false;
      }
    });
  }
  register(form: RegisterForm) {
    if (form.password !== form.comfirm_password || form.email === '' || form.password === '' || form.comfirm_password === '') {
      alert('Hãy điền đầy đủ thông tin');
      return;
    }

    this.getLogin().subscribe((users: any[]) => {
      const existingUser = users.find(u => u.email === form.email);
      if (existingUser) {
        alert('Email already exists');
      } else {
        this.http.post(this.URL, form).subscribe(() => {
          this.router.navigate(['list']);
          this.isAuthenticated = true;
          alert('Register successful');
        });
      }
    }, error => {
      console.error('registration failed:', error);
    });
  }
  logout() {
    this.router.navigate([''])
    this.isAuthenticated = false
  }
}