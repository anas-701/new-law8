import {  Routes } from '@angular/router';
import { AuthGuard } from '../@core/guards/auth.guard';

export const PAGES_ROUTES: Routes = [
    {
        path: '',	
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'clients',	
        loadComponent: () => import('./clients/clients.component').then(m => m.ClientsComponent),
        loadChildren: () => import('./clients/clients.routes').then(m => m.clientsRoutes),
        canActivate:[AuthGuard]
    },
    {
        path: '',
        redirectTo: 'clients',
        pathMatch: 'full'
    }
];
