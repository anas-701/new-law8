import {  Routes } from '@angular/router';

export const PAGES_ROUTES: Routes = [
    {
        path: 'dashboard',	
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'clients',	
        loadComponent: () => import('./clients/clients.component').then(m => m.ClientsComponent),
        loadChildren: () => import('./clients/clients.routes').then(m => m.clientsRoutes)
    },
    {
        path: 'clients/inactive',	
        loadComponent: () => import('./clients/clients.component').then(m => m.ClientsComponent),
        loadChildren: () => import('./clients/clients.routes').then(m => m.clientsRoutes)
    },
    {
        path: '',
        redirectTo: 'clients',
        pathMatch: 'full'
    }
];
