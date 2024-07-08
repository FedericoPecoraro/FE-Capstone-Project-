import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../user/user.service';
import { AuthService } from '../../auth/auth.service';
import { RecipeResponse } from '../../models/recipe.interface';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent implements OnInit {
  @Input() recipe!: RecipeResponse;

  isUserLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private userSvc: UserService, private authSvc: AuthService) {}

  ngOnInit() {
    this.authSvc.isLoggedIn$.subscribe(data => {
      this.isUserLoggedIn = data;
      this.isAdmin = this.authSvc.isAdmin;
    });
  }

  toggleFavorite(recipe: RecipeResponse) {
    const userId = this.userSvc.getCurrentUserId();
    if (userId) {
      if (this.isFavorite(recipe)) {
        this.userSvc.unlikeRecipe(userId, recipe.id).subscribe(
          () => {
            console.log(`Recipe ${recipe.id} removed from favorites.`);
            // Aggiungi logica aggiuntiva se necessario dopo la rimozione dai preferiti
          },
          error => {
            console.error('Error removing recipe from favorites:', error);
            // Gestione degli errori
          }
        );
      } else {
        this.userSvc.likeRecipe(userId, recipe.id).subscribe(
          () => {
            console.log(`Recipe ${recipe.id} added to favorites.`);
            // Aggiungi logica aggiuntiva se necessario dopo l'aggiunta ai preferiti
          },
          error => {
            console.error('Error adding recipe to favorites:', error);
            // Gestione degli errori
          }
        );
      }
    } else {
      console.error('User not authenticated or token invalid.');
      // Gestione caso in cui l'utente non è autenticato o il token non è valido
    }
  }

  isFavorite(recipe: RecipeResponse): boolean {
    // Implementa la logica per verificare se la ricetta è nei preferiti dell'utente
    // Potresti usare una logica basata su userId e recipe.id
    // Ad esempio, controllando se recipe.id è presente nella lista dei preferiti dell'utente corrente
    return false; // Sostituisci con la tua logica reale
  }
}
