import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { SharedButtonComponent } from 'src/app/@shared/components/shared-button/shared-button.component';
import { SharedModule } from 'src/app/@shared/shared.module';

@Component({
  selector: 'app-matters',
  standalone: true,
  imports: [
    SharedModule,
    SharedButtonComponent,
    TabMenuModule
  ],
  templateUrl: './matters.component.html',
  styleUrl: './matters.component.scss'
})
export class MattersComponent implements OnInit {

  _router = inject(Router)
  _route = inject(ActivatedRoute)
  items: MenuItem[] = [
    {
      label: 'All Matters',
      command: () => {
        this._router.navigate(['./'], { relativeTo: this._route })
      }
    },
    {
      label: 'Favourite',
      command: () => {
        this._router.navigate(['./favourite'], { relativeTo: this._route })
      }
    },
  ];
  activeItem!: MenuItem ;
  ngOnInit(): void {
    this.activeItem=this.items.find(obj=>this._router.url.includes(obj?.label?.toLocaleLowerCase()||''))||this.items[0];
    // console.log('this.activeItem',this.activeItem)
    // this._router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.activeItem=this.items.find(obj=>event.url.includes(obj?.label?.toLocaleLowerCase()||''))||this.items[0]
    //   }
    // });
    // this._router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     this.activeItem = this.items.find(obj => event.url.includes(obj?.label?.toLocaleLowerCase() || '')) || this.items[0];
    //     console.log('activeItem',this.activeItem)
    //   }
    // });
  }
}
