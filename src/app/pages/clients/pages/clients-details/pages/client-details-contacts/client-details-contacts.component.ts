import { Component, inject } from '@angular/core';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { MenuModule } from 'primeng/menu';

import { contacts } from './contacts.fake';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ClientDetailsContactsEditorComponent } from './client-details-contacts-editor/client-details-contacts-editor.component';

@Component({
  selector: 'app-client-details-contacts',
  standalone: true,
  imports: [
    SharedButtonComponent,
    SharedModule,
    MenuModule
  ],
  templateUrl: './client-details-contacts.component.html',
  styleUrl: './client-details-contacts.component.scss'
})
export class ClientDetailsContactsComponent {
  selectedRow:any;
  menuItems: MenuItem[] = [
    {
      label: 'View Details',
      icon: 'icon-show',
      command: (event:any) => {
        this.onOpenContactEditor('view');
      }
    },
    { separator: true },
    {
      label: 'Edit',
      icon: 'icon-edit',
      command: (event:any) => {
        this.onOpenContactEditor('edit');
      }
    },
    { separator: true },
    {
      label: 'Delete',
      icon: 'icon-trash',
      command: (event:any) => {
        console.log(event.rowData);
      }
    }
  ];
  contacts = contacts;
  _dialogService = inject(DialogService);
  getMenuItems(rowData: any): MenuItem[] {
    return [
     
    ]
  }
  onRowSelected(rowData:any){
    this.selectedRow = rowData;
  }

  onOpenContactEditor(mode?: string) {
    const ref = this._dialogService.open(ClientDetailsContactsEditorComponent, {
      header: mode ? mode === 'view' ? 'View Contact' : 'Edit Contact' : 'Add Contact',
      width: '600px',
      data: { rowData:this.selectedRow, mode }
    });
    ref.onClose.subscribe((result:any) => {
      this.selectedRow = null;
      if(result){
        
      }
    });
  }
}
