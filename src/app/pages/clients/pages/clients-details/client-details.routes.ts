import { Routes } from "@angular/router";

export const ClientDetailsRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../clients-editor/clients-editor.component').then(m => m.ClientsEditorComponent)
    },
    {
        path: 'contacts',
        loadComponent: () => import('./pages/client-details-contacts/client-details-contacts.component').then(m => m.ClientDetailsContactsComponent)
    },
    {
        path: 'matters',
        loadComponent: () => import('./pages/client-details-matters-editor/client-details-matters-editor.component').then(m => m.ClientDetailsMattersEditorComponent)
    },
]
