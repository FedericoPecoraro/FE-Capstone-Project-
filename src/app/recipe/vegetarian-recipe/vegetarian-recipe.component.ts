import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { RecipeResponse } from '../../models/recipe.interface';

@Component({
  selector: 'app-vegetarian-recipe',
  templateUrl: './vegetarian-recipe.component.html',
  styleUrls: ['./vegetarian-recipe.component.scss']
})
export class VegetarianRecipeComponent implements OnInit {
  recipes: RecipeResponse[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.loadVegetarianRecipes();
  }

  loadVegetarianRecipes(): void {
    this.recipeService.getVegetarianRecipes().subscribe(
      recipes => this.recipes = recipes,
      error => console.error('Error fetching vegetarian recipes:', error)
    );
  }
}
