import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ProductListComponent } from './features/products/product-list/product-list.component';

export const routes: Routes = [
  { path: 'auth/login', 
    component: LoginComponent },

  { path: 'products', 
    component: ProductListComponent },

  { path: '', 
    redirectTo: '/auth/login', 
    pathMatch: 'full' },
    
  { 
    path: '**', 
    redirectTo: 'auth/login' 
  } //que el login sea lo primero que se vea
];
