import { Routes } from "@angular/router";

export const Matter_Details_Routes:Routes=[
    {
        path:'',
        loadComponent:()=>import('./pages/matter-detail-info/matter-detail-info.component').then(comp=>comp.MatterDetailInfoComponent)
    }
]