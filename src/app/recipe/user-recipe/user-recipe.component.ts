import { Component, OnInit } from '@angular/core';
import { RecipeResponse } from '../../models/recipe.interface';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-user-recipe',
  templateUrl: './user-recipe.component.html',
  styleUrls: ['./user-recipe.component.scss']
})
export class UserRecipeComponent implements OnInit {
  createdRecipes: RecipeResponse[] = [];
  favoriteRecipes: RecipeResponse[] = [];
  isUserLoggedIn: boolean = false;

  constructor(private recipeService: RecipeService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isUserLoggedIn = loggedIn;
      if (loggedIn) {
        this.loadCreatedRecipes();
      }
    });
  }

  loadCreatedRecipes(): void {
    this.recipeService.getRecipesByLoggedUser().subscribe(
      recipes => {
        this.createdRecipes = recipes;
      },
      error => {
        console.error('Error fetching created recipes:', error);
      }
    );
  }

  toggleFavorite(recipe: RecipeResponse): void {
    // Implement the logic to toggle favorite status
  }

  isFavorite(recipe: RecipeResponse): boolean {
    // Implement the logic to check if the recipe is favorite
    return false;
  }
}
