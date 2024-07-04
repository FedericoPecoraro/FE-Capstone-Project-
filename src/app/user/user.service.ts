import { Injectable } from '@angular/core';
import { iUser } from '../models/iUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginData } from '../models/login-data';
import { environment } from '../../environments/environment.development';

type AccessData = {
  accessToken: string,
  user: iUser
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  jwtHelper: JwtHelperService = new JwtHelperService()

  authSubject = new BehaviorSubject<iUser | null>(null);

  user$ = this.authSubject.asObservable().pipe(
    tap(user => {
      if (!user) return
      const newAccessData: AccessData = {
        accessToken: this.getAccessToken(),
        user: user
      }
      const jsonUser = JSON.stringify(newAccessData)
      localStorage.setItem('accessData', jsonUser)
    })
  )

  isLoggedIn$ = this.user$.pipe(
    map(user => !!user),
    tap(user => this.syncIsLoggedIn = user)
  )

  syncIsLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.restoreUser()
  }

  registerUrl: string = `${environment.apiUrl}/users`;
  loginUrl: string = `${environment.apiUrl}/users/login`;

  register(newUser: Partial<iUser>): Observable<AccessData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AccessData>(this.registerUrl, newUser, { headers, withCredentials: true });
  }

  login(loginData: LoginData): Observable<AccessData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AccessData>(this.loginUrl, loginData, { headers, withCredentials: true })
      .pipe(tap(data => {
        this.isAdmin = data.user.admin
        this.authSubject.next(data.user)
        localStorage.setItem('accessData', JSON.stringify(data))
        this.autoLogout(data.accessToken)
      }))
  }

  logout() {
    this.isAdmin = false
    this.authSubject.next(null)
    localStorage.removeItem('accessData')
    this.router.navigate(['/user/login'])
  }

  getAccessToken(): string {
    const userJson = localStorage.getItem('accessData')
    if (!userJson) return '';

    const accessData: AccessData = JSON.parse(userJson)
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return '';

    return accessData.accessToken
  }

  autoLogout(jwt: string) {
    const expDate = this.jwtHelper.getTokenExpirationDate(jwt) as Date;
    const expMs = expDate.getTime() - new Date().getTime();

    setTimeout(() => {
      this.logout()
    }, expMs)
  }

  restoreUser() {
    const userJson = localStorage.getItem('accessData')
    if (!userJson) return;

    const accessData: AccessData = JSON.parse(userJson)
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return;

    this.authSubject.next(accessData.user)
    this.autoLogout(accessData.accessToken)
  }

  errors(err: any) {
    switch (err.error) {
      case "Email and Password are required":
        return new Error('Email e password obbligatorie');
      case "Email already exists":
        return new Error('Utente esistente');
      case 'Email format is invalid':
        return new Error('Email non valida');
      case 'Cannot find user':
        return new Error('utente inesistente');
      default:
        return new Error('Errore');
    }
  }
}
