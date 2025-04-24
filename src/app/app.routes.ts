import { Routes } from '@angular/router';
import { LandingComponent } from './Pages/landing/landing.component';
import { AuthenticationComponent } from './Pages/authentication/authentication.component';
import { HomeComponent } from './Pages/home/home.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {path:'', component: LandingComponent},
    {path:'auth', component: AuthenticationComponent},
    {
        path:'home', 
        component: HomeComponent,
        canActivate: [authGuard]
    }
];
