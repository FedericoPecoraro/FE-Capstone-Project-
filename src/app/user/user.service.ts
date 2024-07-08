import { iUser } from '../models/iUser';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = `${environment.apiUrl}/users`;
  private recipeUrl: string = `${environment.apiUrl}/recipes`;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }



  login(username: string, password: string): Observable<{ user: iUser; token: string }> {
    return this.http.post<{ user: iUser; token: string }>(`${this.baseUrl}/login`, { username, password }, { headers: this.headers })
      .pipe(
        catchError(this.handleError<{ user: iUser; token: string }>('login'))
      );
  }

  register(user: Partial<iUser>): Observable<iUser> {
    return this.http.post<iUser>(`${this.baseUrl}/register`, user, { headers: this.headers })
      .pipe(
        catchError(this.handleError<iUser>('register'))
      );
  }

  registerAdmin(user: Partial<iUser>): Observable<iUser> {
    return this.http.post<iUser>(`${this.baseUrl}/registerAdmin`, user, { headers: this.headers })
      .pipe(
        catchError(this.handleError<iUser>('registerAdmin'))
      );
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError<void>('deleteUser'))
      );
  }

  getUserById(id: number): Observable<iUser> {
    return this.http.get<iUser>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError<iUser>('getUserById'))
      );
  }

  updateUser(id: number, user: Partial<iUser>): Observable<iUser> {
    console.log('Updating user with ID:', id);
    console.log('User data:', user);
    return this.http.put<iUser>(`${this.baseUrl}/${id}`, user, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError<iUser>('updateUser'))
      );
  }



  getAllUsers(): Observable<iUser[]> {
    return this.http.get<iUser[]>(this.baseUrl, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError<iUser[]>('getAllUsers', []))
      );
  }

  uploadAvatar(id: number, image: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<{ url: string }>(`${this.baseUrl}/${id}/avatar`, formData, { headers: this.getAuthHeaders() })
      .pipe(
        map(response => response.url),
        catchError(this.handleError<string>('uploadAvatar'))
      );
  }

  deleteAvatar(id: number): Observable<string> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}/avatar`, { headers: this.getAuthHeaders() })
      .pipe(
        map(response => response.message),
        catchError(this.handleError<string>('deleteAvatar'))
      );
  }

  updateAvatar(id: number, image: File): Observable<string> {
    return this.deleteAvatar(id).pipe(
      switchMap(() => this.uploadAvatar(id, image)),
      catchError(this.handleError<string>('updateAvatar'))
    );
  }

  likeRecipe(userId: number, recipeId: number): Observable<void> {
    return this.http.post<void>(`${this.recipeUrl}/${recipeId}/like`, { userId }, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError<void>('likeRecipe'))
      );
  }

  unlikeRecipe(userId: number, recipeId: number): Observable<void> {
    return this.http.post<void>(`${this.recipeUrl}/${recipeId}/unlike`, { userId }, { headers: this.getAuthHeaders() })
      .pipe(
        catchError(this.handleError<void>('unlikeRecipe'))
      );
  }

  getCurrentUserId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      // Decodifica il token JWT per ottenere le informazioni sull'utente
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.id; // Supponendo che l'ID dell'utente sia presente nel payload del token
    }
    return null; // Ritorna null se il token non è presente o non è valido
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
