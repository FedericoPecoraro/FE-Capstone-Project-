import { Component } from '@angular/core';
import { UserService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
show:boolean = false
isMenuCollapsed = true;
isUserLoggedIn: boolean = false;
isAdmin: boolean = false

constructor(private authSvc: UserService) { }

ngOnInit() {
  this.authSvc.isLoggedIn$.subscribe(data => {
    this.isUserLoggedIn = data;
    this.isAdmin = this.authSvc.isAdmin
  })
}

logout() {
  this.authSvc.logout()
}
}
