import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.scss']
})
export class CreateRecipeComponent implements OnInit {

  recipeForm!: FormGroup;
  ingredients: any[] = [];
  utensils: any[] = [];
  tags: any[] = [];

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadIngredients();
    this.loadUtensils();
    this.loadTags();
  }

  initForm(): void {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      preparationTime: [null, Validators.required],
      cookingTime: [null, Validators.required],
      userId: [1], // Da cambiare con la logica effettiva di autenticazione
      ingredientIds: [[], Validators.required],
      utensilIds: [[], Validators.required],
      tagIds: [[]]
    });
  }

  loadIngredients(): void {
    this.recipeService.getIngredients().subscribe(
      ingredients => this.ingredients = ingredients,
      error => console.error('Errore durante il recupero degli ingredienti:', error)
    );
  }

  loadUtensils(): void {
    this.recipeService.getUtensils().subscribe(
      utensils => this.utensils = utensils,
      error => console.error('Errore durante il recupero degli utensili:', error)
    );
  }

  loadTags(): void {
    this.recipeService.getTags().subscribe(
      tags => this.tags = tags,
      error => console.error('Errore durante il recupero dei tag:', error)
    );
  }


}
