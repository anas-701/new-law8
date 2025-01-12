import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/@shared/shared.module';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './app-notification.component.html',
  styleUrl: './app-notification.component.scss',
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
export class AppNotificationComponent {
  isOpen!: boolean;
  notifications:any[]=[
    {
      module:'client',
      title:'New user added to LAW8',
      description:'Ahmed ali created a new task #t0001',
      date:new Date(),
      seen:true
    },
    {
      module:'task',
      title:'New user added to LAW8',
      description:'Ahmed ali created a new task #t0001',
      date:new Date(),
      seen:false
    },
    {
      module:'meeting',
      title:'New user added to LAW8',
      description:'Ahmed ali created a new task #t0001',
      date:new Date(),
      seen:false
    },
    {
      module:'hearing-session',
      title:'New user added to LAW8',
      description:'Ahmed ali created a new task #t0001',
      date:new Date(),
      seen:false
    },
    {
      module:'matter',
      title:'New user added to LAW8',
      description:'Ahmed ali created a new task #t0001',
      date:new Date(),
      seen:false
    },
    {
      module:'expert-meeting',
      title:'New user added to LAW8',
      description:'Ahmed ali created a new task #t0001',
      date:new Date(),
      seen:false
    },
  ]
  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }
}
