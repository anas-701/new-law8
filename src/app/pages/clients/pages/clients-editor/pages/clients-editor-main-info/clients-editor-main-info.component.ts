import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';
import { clientsEditorMainInfoFormlyFieldsConfig } from './clients-editor-main-info-formly-fields.config';
import { API_Config } from 'src/app/@core/api/api-config/api.config';
import { combineLatest } from 'rxjs';
import { ApiService } from 'src/app/@core/api/api.service';
import { UnsubscribeService } from 'src/app/@shared/services/unsubscribe/unsubscribe.service';
import { LanguageService } from 'src/app/@core/services/language.service';
import { EventEmitter } from 'stream';
import { FieldTypeConfig } from '@ngx-formly/core';
import { findField } from 'src/app/@core/utilities/functions/find-field';

@Component({
  selector: 'app-clients-editor-main-info',
  standalone: true,
  imports: [
    FormlyConfigModule
  ],
  templateUrl: './clients-editor-main-info.component.html',
  styleUrl: './clients-editor-main-info.component.scss'
})
export class ClientsEditorMainInfoComponent implements OnInit,OnChanges {

  _apiService = inject(ApiService);
  _unsubscribe = inject(UnsubscribeService);
  _languageService = inject(LanguageService); 
  @Input() formly: FormGroup = new FormGroup({});
  @Input() formlyModel: any;
  @Input() options: any;
  @Input() lookupsData: any;
  formlyFields: any[] = clientsEditorMainInfoFormlyFieldsConfig(this);  
  ngOnInit(): void {
   
    this.getLookupsData();
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  //  if(changes['lookupsData']?.currentValue) {
  //   this.lookupsData=changes['lookupsData'].currentValue;
  //   this.formlyFields = clientsEditorMainInfoFormlyFieldsConfig(this);

  //   console.log('this.lookupsData',this.lookupsData)
  //  }
  }
  getClientGroupOptions(){
    const clientGroupField:FieldTypeConfig =findField(this.formlyFields,'clientGroupId');
    console.log('getClientGroupOptions', this.lookupsData)
    if(clientGroupField){
      clientGroupField.props['optionsArr'] = this.lookupsData?.clientGroup?.result;
      this.formlyModel.clientGroupId = this.setClientGroupValue();
      this.formlyModel={...this.formlyModel}
      console.log(this.formlyModel)
      console.log('clientGroupField',clientGroupField)
    }
    
    
  }

  setClientGroupValue(){
    const selectedClientGroup = this.lookupsData?.clientGroup?.result.find((obj:any)=>obj.id==this.formlyModel.clientGroupId)
    if(!selectedClientGroup) return null;
    return{
      label:selectedClientGroup?.name,
      value:selectedClientGroup?.id
    }

  }
  
  getLookupsData(){
    combineLatest({
      clientCode:this._apiService.post(API_Config.client.getOrNewClientCode, null),
      introducingLawyer:this._apiService.get(API_Config.general.getLawyerShort),
      // country:this._apiService.get(API_Config.general.getCountryLookup),
      clientGroup:this._apiService.get(API_Config.general.getClientGroups,{ orderByDirection: 'ASC' }
      ),
    }).pipe(
      this._unsubscribe.takeUntilDestroy()
    ).subscribe((res)=>{  
      this.lookupsData = res;
      this.formlyFields = clientsEditorMainInfoFormlyFieldsConfig(this);
      setTimeout(() => {
        
        this.getClientGroupOptions()
      }, 100);
    })
  }   
}
