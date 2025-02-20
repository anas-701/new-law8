import { Component, inject, OnInit } from '@angular/core';
import { matter } from './matter.fake';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { SharedModule } from 'src/app/@shared/shared.module';
import { TabMenuModule } from 'primeng/tabmenu';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-matter-details',
  standalone: true,
  imports: [
    BreadcrumbModule,
    SharedButtonComponent,
    SharedModule,
    TabMenuModule
  ],
  templateUrl: './matter-details.component.html',
  styleUrl: './matter-details.component.scss'
})
export class MatterDetailsComponent implements OnInit{
  _router=inject(Router);
  _route=inject(ActivatedRoute)
  items: MenuItem[] | undefined;
  data: any = matter;
  tabs: MenuItem[] = [
    {
      label: 'Details',
      command: () => {
        this._router.navigate(['./'], { relativeTo: this._route })
      }
    },
    {
      label: 'Parties',
      command: () => {
        this._router.navigate(['./parties'], { relativeTo: this._route })
      }
    },
    {
      label: 'Attachments',
      command: () => {
        this._router.navigate(['./attachments'], { relativeTo: this._route })
      }
    },
    {
      label: 'Contacts',
      command: () => {
        this._router.navigate(['./contacts'], { relativeTo: this._route })
      }
    },
    {
      label: 'Related matters',
      command: () => {
        this._router.navigate(['./related-matters'], { relativeTo: this._route })
      }
    },
    {
      label: 'Billing',
      command: () => {
        this._router.navigate(['./billing'], { relativeTo: this._route })
      }
    },
    {
      label: 'Activities',
      command: () => {
        this._router.navigate(['./activities'], { relativeTo: this._route })
      }
    },
  ];
  activeItem!: MenuItem ;
  ngOnInit() {
    this.items = [
      { label: 'Matters',routerLink:'/matters' },
      { label: this.data.title },
    ];
    this.activeItem=this.tabs.find(obj=>this._router.url.includes(obj?.label?.toLocaleLowerCase()||''))||this.tabs[0];
    
  }
 
}
