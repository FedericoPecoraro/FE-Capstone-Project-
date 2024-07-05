import { Component, OnInit } from '@angular/core';
import { RecipeResponse } from '../models/recipe.interface';
import { RecipeService } from './recipe.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {
  recipeArr: RecipeResponse[] = []; // Definisci l'array di ricette

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    // Chiamata al servizio per ottenere le ricette dal backend
    this.recipeService.getAllRecipes().subscribe(
      (recipes: RecipeResponse[]) => {
        this.recipeArr = recipes; // Popola l'array di ricette con i dati ottenuti
      },
      error => {
        console.error('Error fetching recipes:', error);
      }
    );
  }
}
