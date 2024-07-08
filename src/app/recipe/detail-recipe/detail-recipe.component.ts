import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { RecipeResponse } from '../../models/recipe.interface';

@Component({
  selector: 'app-detail-recipe',
  templateUrl: './detail-recipe.component.html',
  styleUrls: ['./detail-recipe.component.scss']
})
export class DetailRecipeComponent implements OnInit {
  recipe: RecipeResponse | undefined;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit(): void {
    const recipeId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(recipeId)) {
      console.error('Invalid recipe ID');
      return;
    }

    this.loadRecipeData(recipeId);
  }

  loadRecipeData(id: number): void {
    this.recipeService.getRecipeById(id).subscribe(
      (data: RecipeResponse) => {
        this.recipe = data;
      },
      error => {
        console.error('Errore durante il recupero della ricetta:', error);
      }
    );
  }
}
