import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe/recipe.service';
import { RecipeResponse } from '../models/recipe.interface';
import { AuthService } from '../auth/auth.service'; // Assicurati che il percorso sia corretto

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  recipeArr: RecipeResponse[] = [];
  isUserLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private recipeService: RecipeService, private authSvc: AuthService) { }

  ngOnInit(): void {
    // Controllo dello stato dell'utente loggato
    this.authSvc.isLoggedIn$.subscribe(data => {
      this.isUserLoggedIn = data;
      this.isAdmin = this.authSvc.isAdmin;
    });

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

  logout() {
    this.authSvc.logout();
  }
}
