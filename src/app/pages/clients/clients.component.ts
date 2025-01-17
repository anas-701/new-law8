import { Component, inject, OnInit } from '@angular/core';
import { SharedEmptySectionComponent } from 'src/app/@shared/components/shared-empty-section/shared-empty-section.component';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedSearchComponent } from 'src/app/@shared/components/shared-search/shared-search.component';
import { Router, RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { clients } from './client.fake';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    SharedEmptySectionComponent,
    SharedButtonComponent,
    TranslateModule,
    SharedSearchComponent,
    RouterModule,
    PaginatorModule,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent implements OnInit   {
  _router = inject(Router);
  data: any[] = clients;
  url:string='';
  ngOnInit(): void {
    this.url=this._router.url.includes('inactive')?'/clients/inactive/view':'/clients/view';
    this.redirectToFirstClientInList()
  }

  searchValueChange(value: string): void {
    console.log(value)
  }
  onPageChange(event: any): void {
    console.log(event)
  }
  redirectToFirstClientInList(){
    this._router.navigate([this.url, this.data[0].id])
  }
}
