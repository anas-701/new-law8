import { MenuItem } from "./menu.model";

// "dashboard": "Tableau de bord",
// "clients": "Clients",
// "matters": "Affaires",
// "taskManagement": "Gestion des tâches",	
// "timesheet": "Feuille de temps",
// "users": "Utilisateurs",
// "lookups": "Recherches",
// "reports": "Rapports",
// "settingsAndManage": "Paramètres et Gérer",
// "getHelp": "Obtenir de l'aide"
export class Menu {
  public static pages: MenuItem[] = [
    {
      items: [
        {
          icon: 'icon-home',
          label: 'menu.dashboard',
          route: '/',

        },
        {
          icon: 'icon-clients',
          label: 'menu.clients',
          route: '/clients',
        },
        {
          icon: 'icon-matters',
          label: 'menu.matters',
          route: '/matters',
          children: [
            {
              label: 'menu.matters',
              route: '/matters'
            },
            {
              label: 'menu.matterTypes',
              route: '/matter-types'
            }
          ]
        },
        {
          icon: 'icon-task',
          label: 'menu.taskManagement',
          route: '/calendar',
        },
        {
          icon: 'icon-timesheet',
          label: 'menu.timesheet',
          route: '/invoices',
        },
        {
          icon: 'icon-users',
          label: 'menu.users',
          route: '/invoices',
        },
        {
          icon: 'icon-lookups',
          label: 'menu.lookups',
          route: '/invoices',
        },
        {
          icon: 'icon-report',
          label: 'menu.reports',
          route: '/reports',
        },
      
      ],
    },
    {
      items:[
        {
          icon: 'icon-setting',
          label: 'menu.settingsAndManage',
          route: '/setting',

        },
        {
          icon: 'icon-help',
          label: 'menu.getHelp',
          route: '/clients',
        },
      ]
    }
  ];
}
