import { Routes } from "@angular/router";

export const mattersRoutes:Routes=[
    {
        path:'',
        loadComponent:()=>import('./pages/matters-list/matters-list.component').then(comp=>comp.MattersListComponent)
    },
    {
        path:'favourite',
        loadComponent:()=>import('./pages/matters-list/matters-list.component').then(comp=>comp.MattersListComponent)
    },
    {
        path:'details/:id',
        loadComponent:()=>import('./pages/matter-details/matter-details.component').then(comp=>comp.MatterDetailsComponent),
        loadChildren:()=>import('./pages/matter-details/matter-details.routes').then(mod=>mod.Matter_Details_Routes)
    }
]