import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { API_Config } from 'src/app/@core/api/api-config/api.config';
import { FormBaseClass } from 'src/app/@core/classes/form-base.class';
import { ApiRes } from 'src/app/@core/models/apiRes-model';
import { AuthService } from 'src/app/@core/services';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';

@Component({
  selector: 'app-forgetpassword-email',
  standalone: true,
  imports: [
    FormlyConfigModule,
    SharedButtonComponent,
    TranslateModule,
    RouterModule
  ],
  templateUrl: './forgetpassword-email.component.html',
  styleUrl: './forgetpassword-email.component.scss'
})
export class ForgetpasswordEmailComponent extends FormBaseClass implements OnInit {
  _authService=inject(AuthService);
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formlyFields = [
      {
        key: 'email',
        type: 'input',
        props: {
          label: this._languageService.getTransValue('auth.email'),
          placeholder: this._languageService.getTransValue(
            'auth.emailPlaceholder'
          ),
          required: true,
        },
        validators: { validation: ['email'] },
      },
    ];
  }

  onSubmit() {
    if(this.formly.invalid) {
      this.formly.markAllAsTouched()
      return
    } 
    this.isLoading = true;
    this._apiService
      .post(
        API_Config.auth.forgetPasswordSendOtp,
        this.formlyModel
      )
      .pipe(
        finalize(() => (this.isLoading = false)),
        this._unsubscribe.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {

          if (res?.isSuccess) {
            this._authService.user={email:this.formlyModel.email}
            this._router.navigate(['/forget-password/otp'])
          } else {
            this._toastrNotifiService.displayError(
              this._languageService.getTransValue('messages.userIdOrEmailWrong')
            );
          }
        },
        error: (err) => {
          this._toastrNotifiService.displayError(
            this._languageService.getTransValue('messages.signInError')
          );
        },
      });
  }

}
