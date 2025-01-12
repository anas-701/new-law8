import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedLanguageComponent } from '@shared/components/shared-language/shared-language.component';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterModule,SharedLanguageComponent,TranslateModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
