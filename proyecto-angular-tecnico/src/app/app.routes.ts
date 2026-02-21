import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  { path: 'auth/login', 
    component: LoginComponent },

  { path: 'auth/register', 
    component: RegisterComponent },

  { path: 'products', 
    component: ProductListComponent},
    //canActivate: [authGuard] , //Solo entran si están logueados

  { path: 'cart', 
    redirectTo: 'products', 
    pathMatch: 'full' },

  { path: '', 
    redirectTo: 'products', 
    pathMatch: 'full' },
    
  { 
    path: '**', 
    redirectTo: 'products' 
  } //Redirige rutas no encontradas a productos
];
