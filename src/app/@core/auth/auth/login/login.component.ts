import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models/apiRes-model';
import { AuthService } from '@core/services';
import { SharedButtonComponent } from '@shared/components/shared-button/shared-button.component';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormlyConfigModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedButtonComponent,
  ],
  providers: [DynamicDialogConfig, DynamicDialogRef],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent extends FormBaseClass implements OnInit {
  _authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formlyFields = [
      {
        key: 'userName',
        type: 'input',
        props: {
          label: 'auth.username',
          placeholder: 'auth.userNamePlaceholder',
          required: true,
        },
      },
      {
        key: 'password',
        type: 'input',
        props: {
          type: 'password',
          label: 'auth.password',
          placeholder: 'auth.passwordPlaceholder',
          required: true,
          feedback: false,
        },
      },
      {
        fieldGroupClassName: 'flex justify-end align-items-center mb-8',
        fieldGroup: [
          // {
          //   key: "RememberMe",
          //   type: "radio",
          //   props: {
          //     options:[{label:this._languageService.getTransValue("auth.rememberMe"),value:true}],
          //   }
          // },
          {
            type: 'button',
            props: {
              label: 'auth.forgetPassword',
              class: 'text-primary text-sm !p-0',
              onClick: () => {
                this._router.navigate(['/forget-password']);
              },
            },
          },
        ],
      },
    ];
  }

  onSubmit() {
    if (this.formly.invalid) {
      this.formly.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this._apiService
      .post(API_Config.auth.login, this.formlyModel)
      .pipe(
        finalize(() => (this.isLoading = false)),
        this._unsubscribe.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {
          if (res.isSuccess) {
            this._authService.setUser({userName:this.formlyModel.userName})
            this.router.navigate(['/auth/otp']);
          }
        },
        error: () => {
          this._toastrNotifiService.displayError(
            this._languageService.getTransValue('messages.signInError')
          );
        },
      });
  }

  // onSubmit() {
  //   if (this.formly.invalid) {
  //     this.formly.markAllAsTouched(); 
  //     return;
  //   }
  //   this.isLoading = true;
  //   this._apiService
  //     .post(API_Config.auth.login, this.formlyModel)
  //     .pipe(
  //       finalize(() => (this.isLoading = false)),
  //       this._unsubscribe.takeUntilDestroy()
  //     )
  //     .subscribe({
  //       next: (res: ApiRes) => {
  //         if (res.isSuccess) {
  //           this._authService.setUser({ userName: this.formlyModel.userName });
  //           this.router.navigate(['/auth/otp']);
  //         }
  //       },
  //     });
  // }
  
}
