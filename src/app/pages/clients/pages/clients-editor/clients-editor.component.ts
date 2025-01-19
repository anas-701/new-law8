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
  isLoading!: boolean;
  formlyModel: any;
  formlyOptions: FormlyFormOptions = {};
  formly: FormGroup = new FormGroup({});
  clientIdentifier: any;
  toggleEditEffect = effect(() => {
    if (!this._router.url.includes('add')) {
      console.log(this._toggleFormService.getToggleEdit())
      this.formlyOptions.formState.readonly = this._toggleFormService.getToggleEdit();
    }
  })
  ngOnInit(): void {

    // this.getLookupsData()
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
  // getLookupsData() {
  //   combineLatest({
  //     clientCode: this._apiService.post(API_Config.client.getOrNewClientCode, null),
  //     introducingLawyer: this._apiService.get(API_Config.general.getLawyerShort),
  //     country: this._apiService.get(API_Config.general.getCountryLookup),
  //     clientGroup: this._apiService.get(API_Config.general.getClientGroups, { orderByDirection: 'ASC' }),
  //   }).pipe(
  //     this._unsubscribe.takeUntilDestroy()
  //   ).subscribe((res) => {
  //     this.lookupsData = res;
  //     this.lookupsData={...this.lookupsData}
  //     if (!this._router.url.includes('add')) {
  //       this.getParams()
  //     }

  //   })
  // }

  setFormData() {
    this._apiService.get(API_Config.client.getById, { id: this.clientIdentifier }).pipe(
      finalize(() => this.isLoading = false),
      this._unsubscribe.takeUntilDestroy()
    ).subscribe({
      next: (res: ApiRes) => {
        this.formlyModel = res.result;
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

    // console.log(this.formlyModel);
    this._apiService
      .post(path, payload)
      .pipe(
        finalize(() => (this.isLoading = false)),
        this._unsubscribe.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {

        },
      });
    this._toggleFormService.updateToggleEdit(true)
    console.log(this.formlyModel);
  }
}
