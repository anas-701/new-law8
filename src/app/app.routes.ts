import {  Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'page',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    loadChildren: () =>
      import('./pages/pages.routes').then((mod) => mod.PAGES_ROUTES),
  },

  {
    path: 'auth',
    loadComponent: () =>
      import('./@core/auth/auth/auth.component').then((m) => m.AuthComponent),
    loadChildren: () =>
      import('./@core/auth/auth/auth.routes').then((mod) => mod.AUTH_ROUTES),
  },
  {
    path: 'forget-password',
    loadComponent: () =>
      import('./@core/auth/forgetpassword/forgetpassword.component').then((m) => m.ForgetpasswordComponent),
    loadChildren: () =>
      import('./@core/auth/forgetpassword/forgetpassword.routes').then((mod) => mod.FORGET_PASSWORD_ROUTES),
  },

  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
