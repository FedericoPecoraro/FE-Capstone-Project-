import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe.component';
import { VeganRecipeComponent } from './vegan-recipe/vegan-recipe.component';
import { VegetarianRecipeComponent } from './vegetarian-recipe/vegetarian-recipe.component';
import { GlutenFreeRecipeComponent } from './gluten-free-recipe/gluten-free-recipe.component';
import { UserRecipeComponent } from './user-recipe/user-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

const routes: Routes = [
  { path: '', component: RecipeComponent },
  { path: 'recipe/vegan', component: VeganRecipeComponent },
  { path: 'recipe/vegetarian', component: VegetarianRecipeComponent },
  { path: 'recipe/gluten-free', component: GlutenFreeRecipeComponent },
  { path: 'recipe/user', component: UserRecipeComponent },
  { path: 'recipe/edit', component: EditRecipeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
