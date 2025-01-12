import { ApplicationRef, ChangeDetectorRef, Component, inject, InjectionToken, OnDestroy, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterOutlet } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { UnsubscribeService } from './@shared/services/unsubscribe/unsubscribe.service';

export const CUSTOM_UNSUBSCRIBE_TOKEN = new InjectionToken<UnsubscribeService>('CustomUnsubscribeService', {
  providedIn: 'root',
  factory: () => new UnsubscribeService()
});


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy{

  _router = inject(Router);
  _spinner = inject(NgxSpinnerService);
  _unsubscribe = inject(CUSTOM_UNSUBSCRIBE_TOKEN);
  appRef = inject(ApplicationRef);
  cdr = inject(ChangeDetectorRef);




  ngOnInit(): void {
    this.checkRoutes()
  }


  checkRoutes() {
    this._router.events.pipe(
      this._unsubscribe.takeUntilDestroy()
    ).subscribe((event: any) => {
      //lazyloading start
      if (event instanceof RouteConfigLoadStart) {
        this._spinner.show();
      }
      //lazy loading end
      else if (event instanceof RouteConfigLoadEnd) {
        this._spinner.hide();
      }
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe.destroy()
  }
}
