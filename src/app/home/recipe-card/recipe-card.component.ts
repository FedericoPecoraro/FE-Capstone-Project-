import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../auth/auth.service';
import { RecipeResponse } from '../../models/recipe.interface';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: RecipeResponse;

  isUserLoggedIn: boolean = false;
  isAdmin: boolean = false;
  favoriteRecipes: number[] = []; // Array per memorizzare gli ID delle ricette preferite

  constructor(private userSvc: UserService, private authSvc: AuthService) {}

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe(data => {
      this.isUserLoggedIn = data;
      this.isAdmin = this.authSvc.isAdmin;
      if (this.isUserLoggedIn) {
        this.loadFavoriteRecipes(); // Carica le ricette preferite dell'utente
      }
    });
  }

  loadFavoriteRecipes() {
    const userId = this.userSvc.getCurrentUserId();
    if (userId) {
      this.userSvc.getFavoriteRecipes(userId).pipe(
        catchError(error => {
          console.error('Error loading favorite recipes:', error);
          return of([]);
        })
      ).subscribe(favorites => {
        this.favoriteRecipes = favorites.map(fav => fav.id); // Supponiamo che la risposta contenga un array di oggetti ricetta con un campo id
      });
    }
  }

  toggleFavorite(recipe: RecipeResponse) {
    const userId = this.userSvc.getCurrentUserId();
    if (userId) {
      if (this.isFavorite(recipe)) {
        this.userSvc.unlikeRecipe(userId, recipe.id).subscribe(
          () => {
            console.log(`Recipe ${recipe.id} removed from favorites.`);
            this.favoriteRecipes = this.favoriteRecipes.filter(id => id !== recipe.id);
          },
          error => {
            console.error('Error removing recipe from favorites:', error);
          }
        );
      } else {
        this.userSvc.likeRecipe(userId, recipe.id).subscribe(
          () => {
            console.log(`Recipe ${recipe.id} added to favorites.`);
            this.favoriteRecipes.push(recipe.id);
          },
          error => {
            console.error('Error adding recipe to favorites:', error);
          }
        );
      }
    } else {
      console.error('User not authenticated or token invalid.');
    }
  }

  isFavorite(recipe: RecipeResponse): boolean {
    return this.favoriteRecipes.includes(recipe.id);
  }
}
