import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {
  title = 'task-managment-app';
  isUserLoggedIn: boolean;
  private navigationSubscription: Subscription;
  constructor(public authService: AuthService,private router: Router) {}

  ngOnInit() {
    this.isUserLoggedIn = this.authService.isLoggedIn;
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.onRouteChange();
      }
    });
  }
  onRouteChange() {
    this.isUserLoggedIn=this.authService.isLoggedIn
  }
 
}
