import { Component, inject, OnInit } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ClickOutsideDirective } from '../../../../@shared/directives/click-outside.directive';
import { SharedModule } from '@shared/shared.module';
@Component({
  selector: 'app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.scss'],
  standalone:true,
  imports:[
    MenuModule,
    SharedModule,
    CommonModule,
    ClickOutsideDirective,
    NgOptimizedImage
  ],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})
export class AppUserComponent implements OnInit{
  public isOpen = false;

  public themeMode = ['topBar.light', 'topBar.dark'];
  ngOnInit(): void {
  }

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }


}
