import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule, FORMLY_CONFIG } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import {
  arabicLettersValidator,
  emailValidator,
  englishLettersValidator,
  passwordValidator,
  urlValidator,
} from './custom-validation';
import { formlyValidationConfig } from './validation-messages';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormlyInputFieldComponent } from './components/formly-input-field/formly-input-field.component';
import { registerTranslateExtension } from './translate.extension';
import { FormlyRadioButtonFieldComponent } from './components/formly-radio-button-field/formly-radio-button-field.component';
import { FormlyButtonFieldComponent } from './components/formly-button-field/formly-button-field.component';
import { SharedButtonComponent } from '../../components/shared-button/shared-button.component';
import { FormlyOtpFieldComponent } from './components/formly-otp-field/formly-otp-field.component';
import { FormlyPasswordFieldComponent } from './components/formly-password-field/formly-password-field.component';
import { PasswordModule } from 'primeng/password';
import { FormlySelectFieldComponent } from './components/formly-select-field/formly-select-field.component';
import { FormlyMultiSelectFieldComponent } from './components/formly-multi-select-field/formly-multi-select-field.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormlyPhoneFieldComponent } from './components/formly-phone-field/formly-phone-field.component';
import { NgxIntlTelInputModule } from '@justin-s/ngx-intl-tel-input';
import { FormlyUploadImageFieldComponent } from './components/formly-upload-image-field/formly-upload-image-field.component';
import { FormlyInputBtnFieldComponent } from './components/formly-input-btn-field/formly-input-btn-field.component';

@NgModule({
  declarations: [
    FormlyInputFieldComponent,
    FormlyButtonFieldComponent,
    FormlyPasswordFieldComponent,
    FormlySelectFieldComponent,
    FormlyMultiSelectFieldComponent,
    FormlyPhoneFieldComponent,
    FormlyUploadImageFieldComponent,
    FormlyInputBtnFieldComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forChild({
      validators: [
        { name: 'arabicLetters', validation: arabicLettersValidator },
        { name: 'englishLetters', validation: englishLettersValidator },
        { name: 'email', validation: emailValidator },
        { name: 'password', validation: passwordValidator },
        { name: 'url', validation: urlValidator },
      ],
      types: [
        { name: 'input', component: FormlyInputFieldComponent },
        { name: 'button', component: FormlyButtonFieldComponent },
        { name: 'radio', component: FormlyRadioButtonFieldComponent },
        { name: 'otp', component: FormlyOtpFieldComponent, extends: 'input' },
        { name: 'password', component: FormlyPasswordFieldComponent, extends: 'input' },
        { name: 'select', component: FormlySelectFieldComponent },
        { name: 'phone', component: FormlyPhoneFieldComponent, extends: 'input' },
        { name: 'multi-select', component: FormlyMultiSelectFieldComponent, extends: 'input' },
        { name: 'upload-image', component: FormlyUploadImageFieldComponent, extends: 'input' },
        { name: 'input-btn', component: FormlyInputBtnFieldComponent, extends: 'input' },
      ]
    }),
    FormlyPrimeNGModule,
    TranslateModule,
    InputTextModule,
    DropdownModule,
    FormlyRadioButtonFieldComponent,
    SharedButtonComponent,
    FormlyOtpFieldComponent,
    TranslateModule,
    PasswordModule,
    MultiSelectModule,
    NgxIntlTelInputModule,
  ],
  exports: [
    ReactiveFormsModule,
    FormlyModule
  ],
  providers: [
    {
      provide: FORMLY_CONFIG,
      multi: true,
      useFactory: formlyValidationConfig,
      deps: [TranslateService],
    },
    { provide: FORMLY_CONFIG, multi: true, useFactory: registerTranslateExtension, deps: [TranslateService] },

  ],
})
export class FormlyConfigModule { }
