import {  Routes } from '@angular/router';

export const PAGES_ROUTES: Routes = [
    {
        path: 'dashboard',	
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
    }
];
