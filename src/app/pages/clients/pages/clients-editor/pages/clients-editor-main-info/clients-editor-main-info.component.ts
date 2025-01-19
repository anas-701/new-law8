import { Component, Input, OnInit, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';
import { clientsEditorMainInfoFormlyFieldsConfig } from './clients-editor-main-info-formly-fields.config';
import { API_Config } from 'src/app/@core/api/api-config/api.config';
import { combineLatest } from 'rxjs';
import { ApiService } from 'src/app/@core/api/api.service';
import { UnsubscribeService } from 'src/app/@shared/services/unsubscribe/unsubscribe.service';
import { LanguageService } from 'src/app/@core/services/language.service';

@Component({
  selector: 'app-clients-editor-main-info',
  standalone: true,
  imports: [
    FormlyConfigModule
  ],
  templateUrl: './clients-editor-main-info.component.html',
  styleUrl: './clients-editor-main-info.component.scss'
})
export class ClientsEditorMainInfoComponent implements OnInit {
  _apiService = inject(ApiService);
  _unsubscribe = inject(UnsubscribeService);
  _languageService = inject(LanguageService); 
  @Input() formly: FormGroup = new FormGroup({});
  @Input() formlyModel: any;
  @Input() options: any;
  formlyFields: any[] = [];  
  ngOnInit(): void {
    this.getLookupsData();
  }
  lookupsData: any = {};
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
    })
  }   
}

