import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SubMenuItem } from './menu.model';
import { LanguageService } from '@core/services/language.service';
import { filter } from 'rxjs';
import { SharedModule } from '@shared/shared.module';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, SharedModule]
})

export class SidebarComponent implements OnInit{
  _menuService = inject(MenuService);
  _languageService = inject(LanguageService);
  _router = inject(Router);

  currentUrl!: string;
  onToggleSidebar() {
    this._menuService.toggleSidebar();
  }
  constructor() {
    this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentUrl = event.urlAfterRedirects;
      });
  }
  ngOnInit(): void {
    console.log(this._menuService.pagesMenu)
  }

  public toggleMenu(subMenu: SubMenuItem) {
    console.log('submenu',subMenu)
    this._menuService.pagesMenu.forEach(page => {
      page.items.forEach(item => {
        if (item !== subMenu) {
          item.expanded = false
        }
      })
    })
    this._menuService.toggleMenu(subMenu);
  }

  isActive(route: string): boolean {
    return this.currentUrl.includes(route);
  }
}
