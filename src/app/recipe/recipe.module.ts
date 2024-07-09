import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeComponent } from './recipe.component';
import { VeganRecipeComponent } from './vegan-recipe/vegan-recipe.component';
import { VegetarianRecipeComponent } from './vegetarian-recipe/vegetarian-recipe.component';
import { GlutenFreeRecipeComponent } from './gluten-free-recipe/gluten-free-recipe.component';
import { UserRecipeComponent } from './user-recipe/user-recipe.component';
import { DetailRecipeComponent } from './detail-recipe/detail-recipe.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    RecipeComponent,
    VeganRecipeComponent,
    VegetarianRecipeComponent,
    GlutenFreeRecipeComponent,
    UserRecipeComponent,
    DetailRecipeComponent,
    CreateRecipeComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class RecipeModule { }
