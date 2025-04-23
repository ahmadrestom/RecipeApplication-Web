import { Routes } from '@angular/router';
import { LandingComponent } from './Pages/landing/landing.component';
import { AuthenticationComponent } from './Pages/authentication/authentication.component';

export const routes: Routes = [
    {path:'', component: LandingComponent},
    {path:'auth', component: AuthenticationComponent}
];
