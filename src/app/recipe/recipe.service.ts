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

  createRecipe(recipeRequest: RecipeRequest): Observable<RecipeResponse> {
    return this.http.post<RecipeResponse>(this.baseUrl, recipeRequest);
  }

  getIngredients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ingredients`);
  }

  getUtensils(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/utensils`);
  }

  getTags(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tags`);
  }

  editRecipe(id: number, recipeRequest: RecipeRequest): Observable<RecipeResponse> {
    return this.http.put<RecipeResponse>(`${this.baseUrl}/${id}`, recipeRequest);
  }

  deleteRecipe(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAllRecipes(): Observable<RecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(this.baseUrl);
  }

  getRecipeByName(query: string): Observable<RecipeResponse[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<RecipeResponse[]>(`${this.baseUrl}/search`, { params });
  }

  getRecipeById(id: number): Observable<RecipeResponse> {
    return this.http.get<RecipeResponse>(`${this.baseUrl}/${id}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  getRecipesByUser(userId: number): Observable<RecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(`${this.baseUrl}/user/${userId}/recipes`);
  }

  getRecipesByLoggedUser(): Observable<RecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(`${this.baseUrl}/user/recipes`);
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
    return this.http.post<{ url: string }>(`${this.baseUrl}/uploadImage`, formData);
  }
}
