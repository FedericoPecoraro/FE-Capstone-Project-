import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../models/iUser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  show: boolean = false;
  isMenuCollapsed = true;
  isUserLoggedIn: boolean = false;
  isAdmin: boolean = false;
  username: string = '';

  constructor(private authSvc: AuthService) { }

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe(data => {
      this.isUserLoggedIn = data;
      this.isAdmin = this.authSvc.isAdmin;
    });

    this.authSvc.getCurrentUser().subscribe(user => {
      if (user) {
        this.username = user.username;
      }
    });
  }

  logout() {
    this.authSvc.logout();
  }
}
