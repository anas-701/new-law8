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
import { combineLatest, finalize } from 'rxjs';
import { ApiService } from 'src/app/@core/api/api.service';
import { API_Config } from 'src/app/@core/api/api-config/api.config';
import { UnsubscribeService } from 'src/app/@shared/services/unsubscribe/unsubscribe.service';
import { ApiRes } from 'src/app/@core/models/apiRes-model';

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
  _apiService = inject(ApiService);
  _unsubscribe = inject(UnsubscribeService);
  isLoading!: boolean;
  lookupsData: any = {};
  formlyModel: any;
  clientIdentifier!: string;
  formlyOptions: FormlyFormOptions = {};
  formly: FormGroup = new FormGroup({});
  toggleEditEffect = effect(() => {
    if (!this._router.url.includes('add')) {
      console.log(this._toggleFormService.getToggleEdit())
      this.formlyOptions.formState.readonly = this._toggleFormService.getToggleEdit();
    }
  })
  ngOnInit(): void {
    if (!this._router.url.includes('add')) {
      this.getParams()
    }
    
  }

  getParams() {
    this._route.params.pipe(this._unsubscribe.takeUntilDestroy()).subscribe({
      next: (res: Params) => {
        this.clientIdentifier = res['id'];
        this.setFormData()
      }
    })
  }

  setFormData() {
    this._apiService.get(API_Config.client.getById,{id:this.clientIdentifier}).pipe(
      finalize(()=>this.isLoading=false),
      this._unsubscribe.takeUntilDestroy()
    ).subscribe({
      next:(res:ApiRes)=>{
        this.formlyModel=res.result;
      }
    })  
    // setTimeout(() => {
    //   this.formlyModel = {
    //     clientCode: 'C12345',
    //     clientName: 'John Doe',
    //     foreignName: 'جون دو',
    //     clientGroup: ['Group 1', 'Group 2'],
    //     introducingLawyer: 'Lawyer 2',
    //     address1: '123 Main St',
    //     address2: 'Apt 4B',
    //     country: 'Country 1',
    //     zipCode: '12345',
    //     city: 'New York',
    //     state: 'NY',
    //     mobile1: '97129992',
    //     mobile2: '97129992',
    //     phone1: '97129992',
    //     phone2: '97129992',
    //     email1: 'johndoe@example.com',
    //     email2: 'johndoe@example.com'
    //   };
    // }, 200);
  }


  onSubmit() {
    if (this.formly.invalid) {
      this.formly.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.formlyModel = {
      ...this.formlyModel,
      // clientContacts: this.contact,
      phone1: this.formly.value.phone1?.internationalNumber,
      phone2: this.formly.value.phone2?.internationalNumber,
      mobile1: this.formly.value.mobile1?.internationalNumber
        ? this.formly.value.mobile1?.internationalNumber
        : this.formly.value.mobile1,
      mobile2: this.formly.value.mobile2?.internationalNumber
        ? this.formly.value.internationalNumber
        : this.formly.value.mobile2,
    };
    const path = this.clientIdentifier
      ? API_Config.client.update
      : API_Config.client.create;

    // console.log(this.formlyModel);
    this._apiService
      .post(path, this.formlyModel)
      .pipe(
        finalize(() => (this.isLoading = false)),
        this._unsubscribe.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {
          // console.log('isSuccess',res.isSuccess)
          if (res.isSuccess) {

          }
        },
      });
    this._toggleFormService.updateToggleEdit(true)
    console.log(this.formly.value);
  }
}
