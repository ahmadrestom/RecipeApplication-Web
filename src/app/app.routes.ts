import { Routes } from '@angular/router';
import { LandingComponent } from './Pages/landing/landing.component';
import { AuthenticationComponent } from './Pages/authentication/authentication.component';
import { HomeComponent } from './Pages/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { RecipeComponent } from './Pages/recipe/recipe.component';
import { BlogsComponent } from './Pages/blogs/blogs.component';
import { CreateRecipeComponent } from './Pages/create-recipe/create-recipe.component';
import { ViewRecipesComponent } from './Pages/view-recipes/view-recipes.component';
import { SavedRecipesComponent } from './Pages/saved-recipes/saved-recipes.component';
import { NotificationsComponent } from './Pages/notifications/notifications.component';

export const routes: Routes = [
    {path:'', component: LandingComponent},
    {path:'auth', component: AuthenticationComponent},
    {
        path:'home', 
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {path: 'recipe/:id', component: RecipeComponent},
    {path: 'blogs', component: BlogsComponent},
    {path: 'view-recipes', component: ViewRecipesComponent},
    {path: 'view-recipes/:category', component: ViewRecipesComponent},
    {path: 'saved-recipes', component: SavedRecipesComponent},
    {path: 'create-recipe', component: CreateRecipeComponent},
    {path: 'notification', component: NotificationsComponent}
];
