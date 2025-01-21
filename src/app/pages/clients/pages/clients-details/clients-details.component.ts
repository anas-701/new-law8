import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { ToggleFormService } from 'src/app/@shared/modules/formly-config/services/toggle-form.service';
import { SharedConfirmDialogComponent } from 'src/app/@shared/components/shared-confirm-dialog/shared-confirm-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';

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
  _toggleFormService = inject(ToggleFormService);
  _router = inject(Router);
  _dialogService = inject(DialogService);
  toggleEdit: boolean = true;
  url = this._router.url.includes('inactive') ? '/clients/inactive/view' : '/clients/view';
  items: MenuItem[] = [
    { label: 'Details', routerLink: [this._router.url], routerLinkActiveOptions: { exact: true } },
    { label: 'Contacts', routerLink: [this._router.url + '/contacts'], routerLinkActiveOptions: { exact: true } },
    { label: 'Matters', routerLink: [this._router.url + '/matters'], routerLinkActiveOptions: { exact: true } }
  ];
  onEdit() {
    this.toggleEdit = !this.toggleEdit;
    this._toggleFormService.updateToggleEdit(this.toggleEdit);
  }
  toggleStatus() {
    this._dialogService.open(SharedConfirmDialogComponent, {
      data: {
        type: 'danger',
        title: 'Deactivate Client',
        message: 'Are you sure you want to deactivate this client?',
        btns: [
          { label: 'Cancel', styleClass: 'border border-grey500 text-grey500', command: () => { } },
          { label: 'Deactivate', styleClass: 'bg-textErrorBase text-white', command: () => { } },
        ]
      }
    })
  }
}
