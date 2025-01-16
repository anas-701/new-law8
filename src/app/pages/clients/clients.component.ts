import { Component } from '@angular/core';
import { SharedEmptySectionComponent } from 'src/app/@shared/components/shared-empty-section/shared-empty-section.component';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedSearchComponent } from 'src/app/@shared/components/shared-search/shared-search.component';
import { RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    SharedEmptySectionComponent,
    SharedButtonComponent,
    TranslateModule,
    SharedSearchComponent,
    RouterModule,
    PaginatorModule
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {
  clients: any[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      code: '123456',
      balance: 1000
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@example.com',
      code: '123456',
      balance: 1000
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john.doe@example.com',
      code: '123456',
      balance: 1000
    },
    {
      id: 4,
      name: 'John Doe',
      email: 'john.doe@example.com',
      code: '123456',
      balance: 1000
    },
    {
      id: 5,
      name: 'John Doe',
      email: 'john.doe@example.com',
      code: '123456',
      balance: 1000
    },
  ];
  searchValueChange(value: string): void {
    console.log(value)
  }
  onPageChange(event: any): void {
    console.log(event)
  }
}
