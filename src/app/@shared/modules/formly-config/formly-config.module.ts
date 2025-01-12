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

@NgModule({
  declarations: [
    FormlyInputFieldComponent,
    FormlyButtonFieldComponent,
    FormlyPasswordFieldComponent
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
    PasswordModule
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
