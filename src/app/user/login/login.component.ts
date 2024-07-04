import { Component } from '@angular/core';
import { LoginData } from '../../models/login-data';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData: LoginData = {username: '', password: ''}

  constructor(
    private authSvc:UserService,
    private router:Router
    ){}

    signIn(){
      this.authSvc.login(this.loginData)
      .subscribe(data => {
        this.router.navigate([''])
      })
    }
}
