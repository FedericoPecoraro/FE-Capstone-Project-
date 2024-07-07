import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RecipeRequest, RecipeResponse } from '../models/recipe.interface';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl: string = `${environment.apiUrl}/recipes`;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createRecipe(recipeRequest: RecipeRequest): Observable<RecipeResponse> {
    return this.http.post<RecipeResponse>(this.baseUrl, recipeRequest, {
      headers: this.getHeaders()
    });
  }

  getIngredients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ingredients`, {
      headers: this.getHeaders()
    });
  }

  getUtensils(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/utensils`, {
      headers: this.getHeaders()
    });
  }

  getTags(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tags`, {
      headers: this.getHeaders()
    });
  }

  editRecipe(id: number, recipeRequest: RecipeRequest): Observable<RecipeResponse> {
    return this.http.put<RecipeResponse>(`${this.baseUrl}/${id}`, recipeRequest, {
      headers: this.getHeaders()
    });
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: this.getHeaders()
    });
  }

  getAllRecipes(): Observable<RecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(this.baseUrl);
  }

  getRecipeByName(query: string): Observable<RecipeResponse[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<RecipeResponse[]>(`${this.baseUrl}/search`, { params });
  }

  getRecipesByUser(username: string): Observable<RecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(`${this.baseUrl}/user/${username}`);
  }

  getRecipesByTagId(tagId: number): Observable<RecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(`${this.baseUrl}/searchByTag`, {
      params: new HttpParams().set('tagId', tagId.toString())
    });
  }

  getVeganRecipes(): Observable<RecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(`${this.baseUrl}/vegan`);
  }

  getVegetarianRecipes(): Observable<RecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(`${this.baseUrl}/vegetarian`);
  }

  getGlutenFreeRecipes(): Observable<RecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(`${this.baseUrl}/glutenFree`);
  }

  getRecipesByUtensil(utensil: string): Observable<RecipeResponse[]> {
    const params = new HttpParams().set('utensil', utensil);
    return this.http.get<RecipeResponse[]>(`${this.baseUrl}/searchByUtensil`, { params });
  }

  getRecipesByTime(maxTime: number): Observable<RecipeResponse[]> {
    const params = new HttpParams().set('maxTime', maxTime.toString());
    return this.http.get<RecipeResponse[]>(`${this.baseUrl}/searchByTime`, { params });
  }

  getRecipesByIngredient(ingredientName: string): Observable<RecipeResponse[]> {
    const params = new HttpParams().set('ingredientName', ingredientName);
    return this.http.get<RecipeResponse[]>(`${this.baseUrl}/searchByIngredient`, { params });
  }

  uploadRecipeImage(recipeName: string, file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('public_id', `${recipeName}_image`);
    return this.http.post<{ url: string }>(`${this.baseUrl}/uploadImage`, formData, {
      headers: this.getHeaders()
    });
  }
}
