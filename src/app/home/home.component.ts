import { UserService } from './../user/user.service';
import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe/recipe.service';
import { RecipeResponse } from '../models/recipe.interface';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  query: string = ''; // Variabile per memorizzare il testo inserito nella search bar
  recipeArr: RecipeResponse[] = []; // Array per memorizzare tutte le ricette ottenute da getAllRecipes()
  searchedRecipes: RecipeResponse[] = []; // Array per memorizzare le ricette trovate durante la ricerca
  isUserLoggedIn: boolean = false;
  isAdmin: boolean = false;
  favoriteRecipes: RecipeResponse[] = [];

  constructor(private recipeService: RecipeService, private authSvc: AuthService, private UserService: UserService) { }

  ngOnInit(): void {
    // Controllo dello stato dell'utente loggato
    this.authSvc.isLoggedIn$.subscribe(data => {
      this.isUserLoggedIn = data;
      this.isAdmin = this.authSvc.isAdmin;
    });

    // Carica tutte le ricette all'avvio
    this.loadAllRecipes();
  }

  loadAllRecipes(): void {
    this.recipeService.getAllRecipes().subscribe(
      (recipes: RecipeResponse[]) => {
        this.recipeArr = recipes;
      },
      error => {
        console.error('Errore nel caricamento delle ricette:', error);
      }
    );
  }

  searchRecipes(): void {
    if (this.query.trim()) {
      this.recipeService.getRecipeByName(this.query).subscribe(
        (data: RecipeResponse[]) => {
          this.searchedRecipes = data;
        },
        (error) => {
          console.error('Errore durante la ricerca delle ricette:', error);
        }
      );
    } else {
      // Se la query è vuota, reimposta l'array delle ricette trovate
      this.searchedRecipes = [];
    }
  }

  logout() {
    this.authSvc.logout();
  }
}
