import { Component } from '@angular/core';
import { LoginData } from '../../models/iLoginData';
import { UserService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData: LoginData = { username: '', password: '' };

  constructor(
    private authSvc: UserService,
    private router: Router
  ) {}

  signIn() {
    this.authSvc.login(this.loginData)
      .subscribe({
        next: data => {
          this.router.navigate(['']);
        },
        error: err => {
          // Gestione degli errori di login
          console.error('Login error:', err);
        }
      });
  }
}
