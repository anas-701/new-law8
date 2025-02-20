import { Component, inject, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';
import { clientsEditorAddressFormlyFieldsConfig } from './clients-editor-address-formly-fields.config';
import { combineLatest } from 'rxjs';
import { API_Config } from 'src/app/@core/api/api-config/api.config';
import { UnsubscribeService } from 'src/app/@shared/services/unsubscribe/unsubscribe.service';
import { ApiService } from 'src/app/@core/api/api.service';

@Component({
  selector: 'app-clients-editor-address',
  standalone: true,
  imports: [
    FormlyConfigModule,
  ],
  templateUrl: './clients-editor-address.component.html',
  styleUrl: './clients-editor-address.component.scss'
})
export class ClientsEditorAddressComponent {
  _apiService=inject(ApiService);
_unsubscribe=inject(UnsubscribeService);  
  @Input() formly: FormGroup=new FormGroup({});
  @Input() formlyModel: any;
  @Input() options:any;
  @Input() lookupsData: any = {};
  formlyFields: any[] = [];
  ngOnInit(): void {
    this.getLookupsData();
  }
  initForm(){
    this.formlyFields = clientsEditorAddressFormlyFieldsConfig(this);
  }
  getLookupsData(){
    combineLatest({
      country:this._apiService.get(API_Config.general.getCountryLookup),
    }).pipe(
      this._unsubscribe.takeUntilDestroy()
    ).subscribe((res)=>{
      this.lookupsData = res;
      this.initForm();
    })
  } 
}
