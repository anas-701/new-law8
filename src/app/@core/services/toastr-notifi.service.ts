import { Injectable, Injector, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from './language.service';

@Injectable({ providedIn: 'root' })
export class ToastrNotifiService {

  /** Use Toastr Service */
  toastr: ToastrService = inject(ToastrService);
  _languageService = inject(LanguageService);


  displaySuccess(message: string) {
    /** Clear current toastr to display the new one */
    if (this.toastr) {
      if (this.toastr.currentlyActive) {
        this.toastr.clear();
      }
      const positionClass = 'toast-top-right';
      /** show Toastr with recieved message */
      this.toastr.success(this._languageService.getTransValue(message), undefined, {
        timeOut: 2500,
        extendedTimeOut: 2500,
        positionClass,
      });
    }
  }

  displayError(message: string) {
    /** Clear current toastr to display the new one */
    if (this.toastr) {
      if (this.toastr.currentlyActive) {
        this.toastr.clear();
      }
      const positionClass = 'toast-top-right';
      /** show Toastr with recieved message */
      this.toastr.error(this._languageService.getTransValue(message), undefined, {
        timeOut: 2500,
        extendedTimeOut: 2500,
        positionClass,
      });
    }
  }
}
