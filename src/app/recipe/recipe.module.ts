import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './recipe.component';
import { VeganRecipeComponent } from './vegan-recipe/vegan-recipe.component';
import { VegetarianRecipeComponent } from './vegetarian-recipe/vegetarian-recipe.component';
import { GlutenFreeRecipeComponent } from './gluten-free-recipe/gluten-free-recipe.component';
import { UserRecipeComponent } from './user-recipe/user-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

@NgModule({
  declarations: [
    RecipeComponent,
    VeganRecipeComponent,
    VegetarianRecipeComponent,
    GlutenFreeRecipeComponent,
    UserRecipeComponent,
    EditRecipeComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule
  ]
})
export class RecipeModule { }
