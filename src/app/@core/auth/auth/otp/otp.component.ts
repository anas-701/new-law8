import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize, interval, take } from 'rxjs';
import { API_Config } from 'src/app/@core/api/api-config/api.config';
import { FormBaseClass } from 'src/app/@core/classes/form-base.class';
import { ApiRes } from 'src/app/@core/models/apiRes-model';
import { AuthService } from 'src/app/@core/services';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { FormlyConfigModule } from 'src/app/@shared/modules/formly-config/formly-config.module';
import { SecondsToTimePipe } from 'src/app/@shared/services/secondsToTime/seconds-to-time.pipe';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [
    FormlyConfigModule,
    SharedButtonComponent,
    TranslateModule,
    SecondsToTimePipe
  ],
  providers:[DynamicDialogConfig,DynamicDialogRef,SecondsToTimePipe],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent extends FormBaseClass implements OnInit {
  _authService=inject(AuthService);
  counterInSeconds!: number;

  ngOnInit(): void {
    this.initForm();
    this.countDown();
    // if(!this._authService.user) this._router.navigate(['/auth/login'])

  }
  override initForm(): void {
    this.formlyFields=[
      {
        key: "otp",
        type: "otp",
        props: {
          required: true,
          length:5
        }
      },
      {
        key: 'userName',
        defaultValue: this._authService.user?.userName,
      },
    ]
  }
  onSubmit() {
    if(this.formly.invalid) return;
    this.isLoading = true;
    this._apiService
      .post(API_Config.auth.verifyOTP, this.formlyModel)
      .pipe(
        finalize(() => (this.isLoading = false)),
        this._unsubscribe.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {
          if (res?.isSuccess) {
            // clearInterval(this.interval);
            this._storageService.setStorage('token', res.result);
            this._toastrNotifiService.displaySuccess(
              this._languageService.getTransValue(
                'messages.signInSuccessfully'
              )
            );
            // this._authService.user.permissions=jwtDecode(res.result)['role']
            // this._permissionService.userPermissions=this._authService.getDecodedToken()['role']
            this._router.navigate(['/dashboard']);
            // setTimeout(() => {
            //   window.location.reload()
            // }, 500);

          } else {
            this._toastrNotifiService.displayError(
              this._languageService.getTransValue('messages.invalidOTP')
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
    countDown() {
      this.isLoading = true;
      this.counterInSeconds=300;
      interval(1000).pipe(
        take(this.counterInSeconds)
      ).subscribe({
        next: () => {
          this.counterInSeconds--;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }

}
