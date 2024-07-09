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

 // private getHeaders(): HttpHeaders {
  //  const accessData = localStorage.getItem('accessData');
    //if (accessData) {
    //  const parsedAccessData = JSON.parse(accessData);
    //  const token = parsedAccessData.accessToken;
    //  return new HttpHeaders({
    //    'Authorization': `Bearer ${token}`,
    //    'Content-Type': 'application/json'
    //  });
  //  } else {
  //    return new HttpHeaders({
  //      'Content-Type': 'application/json'
  //    });
  //  }
//  }


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
      // Rimuovere l'header di autenticazione se non necessario
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
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
    return this.http.post<{ url: string }>(`${this.baseUrl}/uploadImage`, formData);
  }

  likeRecipe(userId: number, recipeId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/like`, { userId, recipeId });
  }

  unlikeRecipe(userId: number, recipeId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/like`, {
      body: { userId, recipeId }
    });
  }
}
