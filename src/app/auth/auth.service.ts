import { Injectable } from '@angular/core';
import { iUser } from '../models/iUser';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginData } from '../models/iLoginData';
import { environment } from '../../environments/environment.development';

type AccessData = {
  accessToken: string,
  user: iUser
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();

  authSubject = new BehaviorSubject<iUser | null>(null);

  user$ = this.authSubject.asObservable().pipe(
    tap(user => {
      if (!user) return;
      const newAccessData: AccessData = {
        accessToken: this.getAccessToken(),
        user: user
      };
      const jsonUser = JSON.stringify(newAccessData);
      localStorage.setItem('accessData', jsonUser);
    })
  );

  isLoggedIn$ = this.user$.pipe(
    map(user => !!user),
    tap(isLoggedIn => this.syncIsLoggedIn = isLoggedIn)
  );

  syncIsLoggedIn: boolean = false;
  isAdmin: boolean = false;

  registerUrl: string = `${environment.apiUrl}/users`;
  loginUrl: string = `${environment.apiUrl}/users/login`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.restoreUser();
  }

  register(newUser: Partial<iUser>): Observable<AccessData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AccessData>(this.registerUrl, newUser, { headers, withCredentials: true })
      .pipe(
        catchError(this.handleError<AccessData>('register'))
      );
  }

  login(loginData: LoginData): Observable<AccessData> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AccessData>(this.loginUrl, loginData, { headers, withCredentials: true })
      .pipe(
        tap(data => {
          this.isAdmin = data.user.admin;
          this.authSubject.next(data.user);
          localStorage.setItem('accessData', JSON.stringify(data));
          this.autoLogout(data.accessToken);
        }),
        catchError(this.handleError<AccessData>('login'))
      );
  }

  getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessData');
    const parsedToken = token ? JSON.parse(token).accessToken : '';
    return new HttpHeaders({
      'Authorization': `Bearer ${parsedToken}`,
      'Content-Type': 'application/json'
    });
  }

  logout() {
    this.isAdmin = false;
    this.authSubject.next(null);
    localStorage.removeItem('accessData');
    this.router.navigate(['/auth/login']);
  }

  getAccessToken(): string {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return '';

    const accessData: AccessData = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return '';

    return accessData.accessToken;
  }

  autoLogout(jwt: string) {
    const expDate = this.jwtHelper.getTokenExpirationDate(jwt);
    if (!expDate) return;

    const expMs = expDate.getTime() - new Date().getTime();

    setTimeout(() => {
      this.logout();
    }, expMs);
  }

  restoreUser() {
    const userJson = localStorage.getItem('accessData');
    if (!userJson) return;

    const accessData: AccessData = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return;

    this.authSubject.next(accessData.user);
    this.autoLogout(accessData.accessToken);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
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
