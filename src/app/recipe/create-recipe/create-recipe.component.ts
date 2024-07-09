import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { RecipeRequest } from '../../models/recipe.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { iUser } from '../../models/iUser';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

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
  currentUser: iUser | null = null;

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    private authSvc: AuthService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadIngredients();
    this.loadUtensils();
    this.loadTags();
    this.authSvc.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
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
    this.recipeService.getIngredients().pipe(
      tap(ingredients => {
        this.ingredients = ingredients;
        console.log('Ingredienti caricati:', this.ingredients);
      }),
      catchError(error => {
        console.error('Errore durante il recupero degli ingredienti:', error);
        if (error.status === 401) {
          console.error('Errore di autenticazione. Token non valido o scaduto.');
          this.router.navigate(['/auth/login']);
        }
        return of([]);
      })
    ).subscribe();
  }

  loadUtensils(): void {
    this.recipeService.getUtensils().pipe(
      tap(utensils => {
        this.utensils = utensils;
        console.log('Utensili caricati:', this.utensils);
      }),
      catchError(error => {
        console.error('Errore durante il recupero degli utensili:', error);
        if (error.status === 401) {
          console.error('Errore di autenticazione. Token non valido o scaduto.');
          this.router.navigate(['/auth/login']);
        }
        return of([]);
      })
    ).subscribe();
  }

  loadTags(): void {
    this.recipeService.getTags().pipe(
      tap(tags => {
        this.tags = tags;
        console.log('Tag caricati:', this.tags);
      }),
      catchError(error => {
        console.error('Errore durante il recupero dei tag:', error);
        if (error.status === 401) {
          console.error('Errore di autenticazione. Token non valido o scaduto.');
          this.router.navigate(['/auth/login']);
        }
        return of([]);
      })
    ).subscribe();
  }

  onSubmit(): void {
    if (this.recipeForm.valid && this.currentUser) {
      const recipeRequest: RecipeRequest = {
        ...this.recipeForm.value,
        userId: this.currentUser.id
      };
      console.log(this.currentUser.id);

      console.log(this.recipeForm.value);

      this.recipeService.createRecipe(recipeRequest).pipe(
        tap(response => {
          console.log('Ricetta creata con successo:', response);
          // Aggiungi logica aggiuntiva se necessario dopo la creazione della ricetta
        }),
        catchError(error => {
          console.error('Errore durante la creazione della ricetta:', error);
          return of(null);
        })
      ).subscribe();
    }
  }
}
