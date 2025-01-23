import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenuItem } from 'primeng/api';
import { ToggleFormService } from 'src/app/@shared/modules/formly-config/services/toggle-form.service';
import { SharedConfirmDialogComponent } from 'src/app/@shared/components/shared-confirm-dialog/shared-confirm-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/@core/api/api.service';
import { API_Config } from 'src/app/@core/api/api-config/api.config';
import { UnsubscribeService } from 'src/app/@shared/services/unsubscribe/unsubscribe.service';
import { ToastrNotifiService } from 'src/app/@core/services';
import { ApiRes } from 'src/app/@core/models/apiRes-model';
import { ClientService } from '../../services/client.service';

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
export class ClientsDetailsComponent implements OnInit {

  _toggleFormService = inject(ToggleFormService);
  _router = inject(Router);
  _route = inject(ActivatedRoute)
  _dialogService = inject(DialogService);
  _apiService = inject(ApiService);
  _unsubscribeService=inject(UnsubscribeService)
  _toastrNotifiService=inject(ToastrNotifiService)
  _clientService=inject(ClientService)
  toggleEdit: boolean = true;
  clientIdentifier: any;
  url = this._router.url.includes('inactive') ? '/clients/inactive/view' : '/clients/view';
  items: MenuItem[] = [
    { label: 'Details', routerLink: [this._router.url], routerLinkActiveOptions: { exact: true } },
    { label: 'Contacts', routerLink: [this._router.url + '/contacts'], routerLinkActiveOptions: { exact: true } },
    { label: 'Matters', routerLink: [this._router.url + '/matters'], routerLinkActiveOptions: { exact: true } }
  ];
  ngOnInit(): void {
    this.getParams()
  }
  getParams() {
    this._route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.clientIdentifier = params['id'];
      }

    });
  }
  onEdit() {
    this.toggleEdit = !this.toggleEdit;
    this._toggleFormService.updateToggleEdit(this.toggleEdit);
  }
  toggleStatus() {
    let ref= this._dialogService.open(SharedConfirmDialogComponent, {
      data: {
        type: 'danger',
        title: 'Deactivate Client',
        message: 'Are you sure you want to deactivate this client?',
        btns: [
          {
            label: 'Cancel',
            styleClass: 'border border-grey500 text-grey500',
            command: () => { }
          },
          {
            label: 'Deactivate',
            styleClass: 'bg-textErrorBase text-white',
            command: () => { this.deactivateClient() }
          },
        ]
      }
    })
    ref.onClose.subscribe({
      next:(res)=>{
        if(res){
          this._clientService.refreshData$.next(true)
        }
      }
    })
  }
  deactivateClient() {
    const params = {
      clientId: this.clientIdentifier,
      Status: false
    }
    this._apiService.post(API_Config.client.activationClient, {}, params).pipe(
      this._unsubscribeService.takeUntilDestroy()
    ).subscribe((res:ApiRes) => {
      if(res.isSuccess){
        this._toastrNotifiService.displaySuccess(res.message)
      }
    }
    )
  }
}
