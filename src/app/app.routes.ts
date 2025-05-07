import { Routes } from '@angular/router';
import { LandingComponent } from './Pages/landing/landing.component';
import { AuthenticationComponent } from './Pages/authentication/authentication.component';
import { HomeComponent } from './Pages/home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { RecipeComponent } from './Pages/recipe/recipe.component';
import { BlogsComponent } from './Pages/blogs/blogs.component';

export const routes: Routes = [
    {path:'', component: LandingComponent},
    {path:'auth', component: AuthenticationComponent},
    {
        path:'home', 
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {path: 'recipe/:id', component: RecipeComponent},
    {path: 'blogs', component: BlogsComponent}

];
