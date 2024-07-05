import { Component, Input } from '@angular/core';
import { UserService } from '../../user/user.service';
import { RecipeResponse } from '../../models/recipe.interface';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss']
})
export class RecipeCardComponent {

  @Input() recipe!: RecipeResponse;

  constructor(private userSvc: UserService) {}

  addToFavorites(recipe: RecipeResponse) {
    const userId = this.userSvc.getCurrentUserId();
    if (userId) {
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
    } else {
      console.error('User not authenticated or token invalid.');
      // Gestione caso in cui l'utente non è autenticato o il token non è valido
    }
  }

  removeFromFavorites(recipe: RecipeResponse) {
    const userId = this.userSvc.getCurrentUserId();
    if (userId) {
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
      console.error('User not authenticated or token invalid.');
      // Gestione caso in cui l'utente non è autenticato o il token non è valido
    }
  }
}
