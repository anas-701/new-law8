import { inject, InjectionToken } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService, StorageService, ToastrNotifiService } from '@core/services';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { UnsubscribeService } from '@shared/services/unsubscribe/unsubscribe.service';
import { ApiService } from '../api/api.service';


export const CUSTOM_UNSUBSCRIBE_TOKEN = new InjectionToken<UnsubscribeService>('CustomUnsubscribeService', {
  providedIn: 'root',
  factory: () => new UnsubscribeService()
});

export abstract class FormBaseClass {


  isLoading: boolean = false;
  isSubmitted: boolean = false;
  formly: FormGroup = new FormGroup({});
  formlyModel: any = {};
  formlyFields: FormlyFieldConfig[] = [];
  formlyOptions: FormlyFormOptions = {};
  lookupsData: any = {};
  _toastrNotifiService = inject(ToastrNotifiService)
  _languageService = inject(LanguageService);
  _dialogService = inject(DialogService);
  // _dynamicDialogConfig = inject(DynamicDialogConfig);
  // _dynamicDialogRef = inject(DynamicDialogRef);
  _storageService = inject(StorageService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _apiService = inject(ApiService);
  _unsubscribe = inject(CUSTOM_UNSUBSCRIBE_TOKEN);
  //init Form
  abstract initForm(): void;
  //get lookup data
  getLookupsData(): void { }

  //get data by id
  getData(): void { }

  //on submit form
  abstract onSubmit(): void;

  // resetForm(): void {
  //   if (this.formlyOptions.resetModel) this.formlyOptions.resetModel({ validate: false })
  //   this.formly.reset()
  // }




  // callFiledLookup(filedKey: string, dependencyKey: string) {
  //   let field;
  //   this.formlyFields.forEach(group => {
  //     field = group.fieldGroup?.find(f => f.key === filedKey);
  //     if (field?.props) {
  //       const hasValue = !!this.formlyModel[dependencyKey];

  //       field.props['subject']?.next(hasValue);
  //     }
  //   });
  // }



  // findField(formlyFields: any, fieldKey: string) {

  //   for (let field of formlyFields) {
  //     if (field.key === fieldKey) {
  //       return field; // Found the object with the matching key
  //     }

  //     if (field.fieldGroup && field.fieldGroup.length > 0) {
  //       const foundObject: any = this.findField(field.fieldGroup, fieldKey);
  //       if (foundObject) {
  //         return foundObject; // Found the object within the nested array
  //       }
  //     }

  //     if (field.fieldArray && field.fieldArray.fieldGroup && field.fieldArray.fieldGroup.length > 0) {
  //       const foundObject: any = this.findField(field.fieldArray.fieldGroup, fieldKey);
  //       if (foundObject) {
  //         return foundObject; // Found the object within the nested array
  //       }
  //     }
  //   }

  //   return null; // Object with the specified fieldKey not found
  // }


  // //used after leaving the component

}
// export class FormBaseClass implements OnDestroy {
//   private unsubscribeAll: Subject<boolean>;

//   isLoading: boolean = false;
//   isSubmit: boolean = false;
//   formly: FormGroup = new FormGroup({});
//   formlyModel: any = {};
//   formlyFields: FormlyFieldConfig[] = [];
//   formlyOption: FormlyFormOptions = {};


//   lookupsData: any = [];

//   _languageService = inject(LanguageService);
//   _toastrNotifiService = inject(ToastrNotifiService);
//   _dialogService = inject(DialogService);
//   _dynamicDialogConfig = inject(DynamicDialogConfig);
//   _dynamicDialogRef = inject(DynamicDialogRef);
//   _apiService = inject(ApiService);
//   _route = inject(ActivatedRoute);
//   _router = inject(Router);
//   _authService = inject(AuthService);
//   // _sharedService = inject(SharedService);
//   // _sharedTableService = inject(SharedTableService);

//   //init Form
//   abstract initForm(): void;

//   //get lookup data
//   getLookupsData(): void { }

//   //get data by id
//   getData(): void { }

//   //on submit form
//   abstract onSubmit(): void;

//   protected takeUntilDestroy = () => {
//     if (!this.unsubscribeAll) this.unsubscribeAll = new Subject<boolean>();
//     return takeUntil(this.unsubscribeAll);
//   };

//   //used after leaving the component
//   ngOnDestroy(): void {
//     if (this.unsubscribeAll) {
//       this.unsubscribeAll.next(true);
//       this.unsubscribeAll.complete();
//     }
//   }
// }
