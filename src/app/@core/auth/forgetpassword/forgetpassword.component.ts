import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedLanguageComponent } from 'src/app/@shared/components/shared-language/shared-language.component';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [
    TranslateModule,
    SharedLanguageComponent,
    RouterModule,
    NgOptimizedImage
  ],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  _router=inject(Router);
}
