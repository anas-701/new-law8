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
   
]