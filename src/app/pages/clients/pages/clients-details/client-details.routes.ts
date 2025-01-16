import { Routes } from "@angular/router";

export const ClientDetailsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../clients-editor/clients-editor.component').then(m => m.ClientsEditorComponent)
    },
    {
        path: 'contacts',
        loadComponent: () => import('./pages/client-details-contacts-editor/client-details-contacts-editor.component').then(m => m.ClientDetailsContactsEditorComponent)
    },
    {
        path: 'matters',
        loadComponent: () => import('./pages/client-details-matters-editor/client-details-matters-editor.component').then(m => m.ClientDetailsMattersEditorComponent)
    },
]
