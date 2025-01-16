import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-clients-details',
  standalone: true,
  imports: [
    SharedButtonComponent,
    TranslateModule,
    RouterOutlet,
    TabMenuModule
  ],
  templateUrl: './clients-details.component.html',
  styleUrl: './clients-details.component.scss'
})
export class ClientsDetailsComponent {
  items: MenuItem[] = [
    { label: 'Details', routerLink: ['/clients/view/1'], routerLinkActiveOptions: { exact: true }},
    { label: 'Contacts', routerLink: ['/clients/view/1/contacts'], routerLinkActiveOptions: { exact: true }},
    { label: 'Matters', routerLink: ['/clients/view/1/matters'], routerLinkActiveOptions: { exact: true }}
  ];
}
