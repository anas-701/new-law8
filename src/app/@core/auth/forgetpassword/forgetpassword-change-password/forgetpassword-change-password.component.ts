import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs';
import { API_Config } from 'src/app/@core/api/api-config/api.config';
import { FormBaseClass } from 'src/app/@core/classes/form-base.class';
import { ApiRes } from 'src/app/@core/models/apiRes-model';
import { AuthService } from 'src/app/@core/services';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { SharedConfirmDialogComponent } from 'src/app/@shared/components/shared-confirm-dialog/shared-confirm-dialog.component';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';

@Component({
  selector: 'app-forgetpassword-change-password',
  standalone: true,
  imports: [
    FormlyConfigModule,
    SharedButtonComponent,
    TranslateModule,
    RouterModule,
  ],
  templateUrl: './forgetpassword-change-password.component.html',
  styleUrl: './forgetpassword-change-password.component.scss',
})
export class ForgetpasswordChangePasswordComponent
  extends FormBaseClass
  implements OnInit
{
  _authService = inject(AuthService);
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formlyFields = [
      {
        key: 'newPassword',
        type: 'password',
        props: {
          label: this._languageService.getTransValue('auth.password'),
          required: true,
        },
      },
      {
        key: 'confirmPassword',
        type: 'password',
        props: {
          label: this._languageService.getTransValue('auth.confirmPassword'),
          required: true,
        },
        validators: {
          fieldMatch: {
            expression: (control: any) =>
              control.value === this.formlyModel.newPassword,
            message: this._languageService.getTransValue(
              'validation.passwordNotMatching'
            ),
          },
        },
        expressionProperties: {
          'props.disabled': (model) => !this.formly.get('newPassword')?.valid,
        },
      },
    ];
  }

  onSubmit() {
    if (this.formly.invalid) return;
    this.isLoading = true;
    this._apiService
      .post(API_Config.auth.forgetPassword, {
        ...this._authService.user,
        newPassword: this.formlyModel.newPassword,
      })
      .pipe(
        this._unsubscribe.takeUntilDestroy(),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (res: ApiRes) => {
          if (res.isSuccess) {
            const confirmDialog = this._dialogService.open(
              SharedConfirmDialogComponent,
              {
                modal: true,
                width: '30vw',
                data: {
                  title: this._languageService.getTransValue(
                    'auth.yourSuccessfullyChangedYourPassword'
                  ),
                  message: this._languageService.getTransValue(
                    'auth.youCanLoginNow'
                  ),
                  btnText:
                    this._languageService.getTransValue('auth.backToLogin'),
                },
              }
            );
            confirmDialog.onClose
              .pipe(this._unsubscribe.takeUntilDestroy())
              .subscribe({
                next: (res: any) => {
                  if (res) {
                    this._router.navigate(['/auth/login']);
                  }
                },
              });
          }
        },
      });
  }
}
