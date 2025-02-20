import { Component, effect, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { ClientsEditorAddressComponent } from './pages/clients-editor-address/clients-editor-address.component';
import { ClientsEditorContactComponent } from './pages/clients-editor-contact/clients-editor-contact.component';
import { ClientsEditorMainInfoComponent } from './pages/clients-editor-main-info/clients-editor-main-info.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleFormService } from 'src/app/@shared/modules/formly-config/services/toggle-form.service';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormlyFormOptions } from '@ngx-formly/core';
import { finalize } from 'rxjs';
import { API_Config } from 'src/app/@core/api/api-config/api.config';
import { ApiRes } from 'src/app/@core/models/apiRes-model';
import { UnsubscribeService } from 'src/app/@shared/services/unsubscribe/unsubscribe.service';
import { ApiService } from 'src/app/@core/api/api.service';
import { ToastrNotifiService } from 'src/app/@core/services';
import { objectToFormData } from 'src/app/@core/utilities/functions/objectToFormData';
import { ClientService } from '../../services/client.service';
import { DialogService } from 'primeng/dynamicdialog';
import { SharedConfirmDialogComponent } from 'src/app/@shared/components/shared-confirm-dialog/shared-confirm-dialog.component';
import { ConfirmDialogType } from 'src/app/@shared/enums/confirm-dialog-type';

@Component({
  selector: 'app-clients-editor',
  standalone: true,
  imports: [
    SharedButtonComponent,
    TranslateModule,
    ClientsEditorAddressComponent,
    ClientsEditorMainInfoComponent,
    ClientsEditorContactComponent,
    ReactiveFormsModule,
    FormsModule,
    FormlyConfigModule
  ],
  templateUrl: './clients-editor.component.html',
  styleUrl: './clients-editor.component.scss'
})
export class ClientsEditorComponent implements OnInit {
  _toggleFormService = inject(ToggleFormService);
  _router = inject(Router);
  _route = inject(ActivatedRoute);
  _unsubscribe = inject(UnsubscribeService);
  _apiService = inject(ApiService);
  _toastrNotifiService = inject(ToastrNotifiService);
  _dialogService = inject(DialogService);
  _clientService = inject(ClientService)
  isLoading!: boolean;
  formlyModel: any;
  formlyOptions: FormlyFormOptions = {};
  formly: FormGroup = new FormGroup({});
  clientIdentifier: any;
  toggleEditEffect = effect(() => {
    if (this._router.url.includes('view')) {
      this.formlyOptions.formState.readonly = this._toggleFormService.getToggleEdit();
    }
  })
  ngOnInit(): void {
    if (!this._router.url.includes('add')) {
      this.getParams()
    }
  }
  getParams() {
    this._route.params.pipe(
      this._unsubscribe.takeUntilDestroy()
    ).subscribe((params: Params) => {
      this.clientIdentifier = params['id'] || 1;
      this.setFormData();
    })
  }

  setFormData() {
    this._apiService.get(API_Config.client.getById, { id: this.clientIdentifier }).pipe(
      finalize(() => this.isLoading = false),
      this._unsubscribe.takeUntilDestroy()
    ).subscribe({
      next: (res: ApiRes) => {
        if (res.isSuccess) {
          this.formlyModel = res.result;
          this._clientService.client$.next(this.formlyModel)
          // this.formlyModel.image=res.result?.imagePath?environment.baseUrl+res.result?.imagePath:null;
          // this.formlyModel={...this.formlyModel}
        }
      }
    })
  }

  onSubmit() {
    if (this.formly.invalid) {
      this.formly.markAllAsTouched();
      return
    };
    this.isLoading = true;
    let payload = {
      ...this.formly.value,
      phone1: this.formly.value?.phone1?.internationalNumber,
      phone2: this.formly.value?.phone2?.internationalNumber,
      mobile1: this.formly.value?.mobile1?.internationalNumber
        ? this.formly.value?.mobile1?.internationalNumber
        : this.formly.value.mobile1,
      mobile2: this.formly.value?.mobile2?.internationalNumber
        ? this.formly.value?.mobile2?.internationalNumber
        : this.formly.value.mobile2,
    };
    const body = this.clientIdentifier ? { ...payload, id: this.clientIdentifier } : payload
    const path = this.clientIdentifier
      ? API_Config.client.update
      : API_Config.client.create;

    this._apiService
      .post(path, objectToFormData(body))
      .pipe(
        finalize(() => (this.isLoading = false)),
        this._unsubscribe.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {
          if (res.isSuccess) {

            if (!this.clientIdentifier) {
              this.onSuccess(res.result)
            }
            this._toastrNotifiService.displaySuccess(res.message)
          }
        },
      });
    this._toggleFormService.updateToggleEdit(true)
  }
  onSuccess(client: any) {
    const ref = this._dialogService.open(SharedConfirmDialogComponent, {
      data: {
        type: ConfirmDialogType.Success,
        title: 'Client Added Successfully',
        message: 'Here some Action you can do next',
        btns: [
          {
            label: 'Close',
            styleClass: 'border border-grey500 text-grey500 !py-2.5 font-medium text-lg',
            command: () => {
              ref.close()
            }
          },
          {
            label: 'Add Contact',
            styleClass: 'border border-primary text-primary !py-2.5 font-medium text-lg',
            command: () => {
              this._router.navigate([`/clients/view/${client.id}/contacts`])
            }
          },
          {
            label: 'Add Matter',
            styleClass: 'bg-primary text-white !py-2.5 font-medium text-lg',
            command: () => {
              this._router.navigate([`/clients/view/${client.id}/matters`])
            }
          },
        ]
      }
    })
  }
}
