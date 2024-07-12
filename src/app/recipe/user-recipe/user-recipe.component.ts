import { Component, OnInit } from '@angular/core';
import { RecipeResponse } from '../../models/recipe.interface';
import { RecipeService } from '../recipe.service';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-user-recipe',
  templateUrl: './user-recipe.component.html',
  styleUrls: ['./user-recipe.component.scss']
})
export class UserRecipeComponent implements OnInit {
  createdRecipes: RecipeResponse[] = [];
  favoriteRecipes: RecipeResponse[] = [];
  createdRecipesGrouped: RecipeResponse[][] = [];
  favoriteRecipesGrouped: RecipeResponse[][] = [];
  isUserLoggedIn: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(loggedIn => {
      this.isUserLoggedIn = loggedIn;
      if (loggedIn) {
        this.loadCreatedRecipes();
        this.loadFavoriteRecipes();
      }
    });
  }

  loadCreatedRecipes(): void {
    this.recipeService.getRecipesByLoggedUser().subscribe(
      recipes => {
        this.createdRecipes = recipes;
        this.createdRecipesGrouped = this.groupRecipes(this.createdRecipes, 3);
      },
      error => {
        console.error('Error fetching created recipes:', error);
      }
    );
  }

  loadFavoriteRecipes(): void {
    const userId = this.userService.getCurrentUserId();
    if (userId) {
      this.userService.getFavoriteRecipes(userId).subscribe(
        {
          next: (recipes) => {
            this.favoriteRecipes = recipes;
            this.favoriteRecipesGrouped = this.groupRecipes(this.favoriteRecipes, 3);
            console.log(recipes);
          },
          error: (error) => {
            console.error('Error fetching favorite recipes:', error);
          }
        }
      );
    }
  }

  groupRecipes(recipes: RecipeResponse[], groupSize: number): RecipeResponse[][] {
    const groupedRecipes: RecipeResponse[][] = [];
    for (let i = 0; i < recipes.length; i += groupSize) {
      groupedRecipes.push(recipes.slice(i, i + groupSize));
    }
    return groupedRecipes;
  }

  toggleFavorite(recipe: RecipeResponse): void {
    // Implement the logic to toggle favorite status
  }

  isFavorite(recipe: RecipeResponse): boolean {
    return this.favoriteRecipes.some(favRecipe => favRecipe.id === recipe.id);
  }
}
