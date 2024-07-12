import { Component, Input, OnInit } from '@angular/core';
import { RecipeResponse } from '../../models/recipe.interface';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: RecipeResponse;

  isUserLoggedIn: boolean = false;
  isAdmin: boolean = false;
  favoriteRecipes: number[] = [];

  constructor(private userSvc: UserService, private authSvc: AuthService) {}

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe(data => {
      this.isUserLoggedIn = data;
      this.isAdmin = this.authSvc.isAdmin;
      if (this.isUserLoggedIn) {
        this.loadFavoriteRecipes();
      }
    });
  }

  loadFavoriteRecipes() {
    const userId = this.userSvc.getCurrentUserId();
    if (userId) {
      this.userSvc.getFavoriteRecipes(userId).subscribe(
        recipes => {
          this.favoriteRecipes = recipes.map(recipe => recipe.id);
        },
        error => {
          console.error('Error loading favorite recipes:', error);
        }
      );
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
            console.log(this.favoriteRecipes);

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
            console.log(this.favoriteRecipes);

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
