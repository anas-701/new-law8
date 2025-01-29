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
import { LanguageService, ToastrNotifiService } from 'src/app/@core/services';
import { ApiRes } from 'src/app/@core/models/apiRes-model';
import { ClientService } from '../../services/client.service';
import { ConfirmDialogType } from 'src/app/@shared/enums/confirm-dialog-type';

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
  _languageService=inject(LanguageService)
  toggleEdit: boolean = true;
  clientIdentifier: any;
  client:any;
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
        this.getData()
      }

    });
  }
  getData(){
    this._clientService.client$.pipe(
      this._unsubscribeService.takeUntilDestroy()
    ).subscribe({
      next:(res:any)=>{
        this.client = res
        console.log(res)
      }
    })
  }
  onEdit() {
    this.toggleEdit = !this.toggleEdit;
    this._toggleFormService.updateToggleEdit(this.toggleEdit);
  }
  toggleStatus() {
    const title=this._router.url.includes('inactive')?'Activate':'Deactivate'
    const message=this._router.url.includes('inactive')?'Are you sure you want to activate this client?':'Are you sure you want to deactivate this client?'
    let ref= this._dialogService.open(SharedConfirmDialogComponent, {
      data: {
        type: this._router.url.includes('inactive')?ConfirmDialogType.Success:ConfirmDialogType.Danger,
        title: title,
        message: message,
        btns: [
          {
            label: 'Cancel',
            styleClass: 'border border-grey500 text-grey500',
            command: () => { ref.close() }      
          },
          {
            label: this._router.url.includes('inactive')?'Activate':'Deactivate',
            styleClass: this._router.url.includes('inactive')?'bg-primary text-white':'bg-textErrorBase text-white',
            command: () => { this.toggleActivation() }
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
  toggleActivation() {
    const params = {
      clientId: this.clientIdentifier,
      Status: this._router.url.includes('inactive')?true:false
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
