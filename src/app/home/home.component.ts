import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe/recipe.service';
import { RecipeResponse } from '../models/recipe.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipeArr: RecipeResponse[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    // Ottieni le ricette dal servizio condiviso
    this.recipeService.getAllRecipes().subscribe(
      (recipes: RecipeResponse[]) => {
        this.recipeArr = recipes;
      },
      error => {
        console.error('Error getting recipes from service:', error);
      }
    );
  }
}
