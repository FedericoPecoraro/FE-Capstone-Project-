import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { RecipeRequest } from '../../models/recipe.interface';
import { Router } from '@angular/router';

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
    private recipeService: RecipeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadIngredients();
    this.loadUtensils();
    this.loadTags();
    this.checkAuthentication();
  }

  initForm(): void {
    this.recipeForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      preparationTime: [null, Validators.required],
      cookingTime: [null, Validators.required],
      ingredientIds: [[], Validators.required],
      utensilIds: [[], Validators.required],
      tagIds: [[]]
    });
  }

  loadIngredients(): void {
    this.recipeService.getIngredients().subscribe(
      ingredients => {
        this.ingredients = ingredients;
        console.log('Ingredienti caricati:', this.ingredients);
      },
      error => {
        console.error('Errore durante il recupero degli ingredienti:', error);
        if (error.status === 401) {
          console.error('Errore di autenticazione. Token non valido o scaduto.');
          this.router.navigate(['/auth/login']);
        }
      }
    );
  }

  loadUtensils(): void {
    this.recipeService.getUtensils().subscribe(
      utensils => {
        this.utensils = utensils;
        console.log('Utensili caricati:', this.utensils);
      },
      error => {
        console.error('Errore durante il recupero degli utensili:', error);
        if (error.status === 401) {
          console.error('Errore di autenticazione. Token non valido o scaduto.');
          this.router.navigate(['/auth/login']);
        }
      }
    );
  }

  loadTags(): void {
    this.recipeService.getTags().subscribe(
      tags => {
        this.tags = tags;
        console.log('Tag caricati:', this.tags);
      },
      error => {
        console.error('Errore durante il recupero dei tag:', error);
        if (error.status === 401) {
          console.error('Errore di autenticazione. Token non valido o scaduto.');
          this.router.navigate(['/auth/login']);
        }
      }
    );
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const recipeRequest: RecipeRequest = this.recipeForm.value;
      this.recipeService.createRecipe(recipeRequest).subscribe(
        response => {
          console.log('Ricetta creata con successo:', response);
          // Aggiungi logica aggiuntiva se necessario dopo la creazione della ricetta
        },
        error => {
          console.error('Errore durante la creazione della ricetta:', error);
          if (error.status === 401) {
            console.error('Errore di autenticazione. Token non valido o scaduto.');
            this.router.navigate(['/auth/login']);
          }
        }
      );
    }
  }


  checkAuthentication(): void {
    const token = localStorage.getItem('accessData');
    if (!token) {
      console.error('Token non presente. Reindirizzamento al login.');
      this.router.navigate(['/auth/login']);
    }
  }
}
