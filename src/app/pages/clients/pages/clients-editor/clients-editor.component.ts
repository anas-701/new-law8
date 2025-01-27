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
import { environment } from 'src/environments/environment';
import { ClientService } from '../../services/client.service';

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
  _toastrNotifiService=inject(ToastrNotifiService);
  _clientService=inject(ClientService)
  isLoading!: boolean;
  formlyModel: any;
  formlyOptions: FormlyFormOptions = {};
  formly: FormGroup = new FormGroup({});
  clientIdentifier: any;
  toggleEditEffect = effect(() => {
    if (!this._router.url.includes('add')) {
      this.formlyOptions.formState.readonly = this._toggleFormService.getToggleEdit();
    }
  })
  ngOnInit(): void {
    console.log('ngOnInit')
    if (!this._router.url.includes('add')) {
      this.getParams()
    }
  }
  getParams() {
    this._route.params.pipe(
      this._unsubscribe.takeUntilDestroy()
    ).subscribe((params: Params) => {
      this.clientIdentifier = params['id'];
      this.setFormData();
    })
  }

  setFormData() {
    this._apiService.get(API_Config.client.getById, { id: this.clientIdentifier }).pipe(
      finalize(() => this.isLoading = false),
      this._unsubscribe.takeUntilDestroy()
    ).subscribe({
      next: (res: ApiRes) => {
        if(res.isSuccess){
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
    const path = this.clientIdentifier
      ? API_Config.client.update
      : API_Config.client.create;
      
    this._apiService
      .post(path, objectToFormData(payload))
      .pipe(
        finalize(() => (this.isLoading = false)),
        this._unsubscribe.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {
          if(res.isSuccess){
            this._toastrNotifiService.displaySuccess(res.message)
          }
        },
      });
    this._toggleFormService.updateToggleEdit(true)
  }
}
