import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { RecipeResponse } from '../../models/recipe.interface';

@Component({
  selector: 'app-gluten-free-recipe',
  templateUrl: './gluten-free-recipe.component.html',
  styleUrls: ['./gluten-free-recipe.component.scss']
})
export class GlutenFreeRecipeComponent implements OnInit {
  recipes: RecipeResponse[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.loadGlutenFreeRecipes();
  }

  loadGlutenFreeRecipes(): void {
    this.recipeService.getGlutenFreeRecipes().subscribe(
      recipes => this.recipes = recipes,
      error => console.error('Error fetching gluten free recipes:', error)
    );
  }
}
