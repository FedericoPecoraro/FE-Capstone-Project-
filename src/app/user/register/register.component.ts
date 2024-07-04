import { Component } from '@angular/core';
import { iUser } from '../../models/iUser';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerData:Partial<iUser> = {}

  constructor(
    private authSvc:UserService,
    private router:Router
    ){}

  signUp(){
    this.authSvc.register(this.registerData)
    .subscribe(data => {
      this.router.navigate([''])
    })
  }
}
