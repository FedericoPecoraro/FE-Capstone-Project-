import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { RecipeResponse } from '../../models/recipe.interface';

@Component({
  selector: 'app-vegan-recipe',
  templateUrl: './vegan-recipe.component.html',
  styleUrls: ['./vegan-recipe.component.scss']
})
export class VeganRecipeComponent implements OnInit {
  recipes: RecipeResponse[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.loadVeganRecipes();
  }

  loadVeganRecipes(): void {
    this.recipeService.getVeganRecipes().subscribe(
      recipes => this.recipes = recipes,
      error => console.error('Error fetching vegan recipes:', error)
    );
  }
}
