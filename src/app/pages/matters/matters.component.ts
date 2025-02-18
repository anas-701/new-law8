import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class MattersComponent {
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
  activeItem: MenuItem =this.items[0];
}
