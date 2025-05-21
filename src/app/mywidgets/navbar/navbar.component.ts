import { Component, inject, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbDropdownModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { AppLogoComponent } from '../app-logo/app-logo.component';
import { routeNames } from '../../app.routes';
import { ProfileStore } from '../../mystores/profile.store';
import { User } from '../../myinterfaces/user';
import { getCookie } from '../../utils/cookie';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbDropdownModule, AppLogoComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  // Track Navigation
  offcanvasService = inject(NgbOffcanvas);
  router = inject(Router);
  isLoginPage = false;
  nonUserRoutes = [
    "/",
    "/forgot-password",
  ];
  userLink = `/${routeNames.user.path}`;

  constructor() {
    this.trackNavigation();
  }

  private trackNavigation() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        const navEndEvent = event as NavigationEnd; // ✅ Explicit type assertion
        if (this.nonUserRoutes.includes(navEndEvent.urlAfterRedirects)) {
          this.isLoginPage = true;
        } else {
          this.isLoginPage = false;
        }
      });
  }

  // Drawer Component
  @ViewChild('drawer') drawer: any;

  openDrawer() {
    this.offcanvasService.open(this.drawer, { position: 'start' }); // 'start' = left side
  }

  navigateAndClose(offcanvas: any, path: string) {
    this.router.navigate([path]);
    offcanvas.dismiss();
  }

  // Dropdown
  onAccount() {
    //
  }

  onLogout() {
    this.router.navigate([routeNames.logout.path]);
  }

  // Profile
  profileStore = inject(ProfileStore);
  profile = this.profileStore.profile$;
  profileSub = Subscription.EMPTY;
  profileData: User = {};

  ngOnInit() {
    const hasToken = getCookie('user-session');
    this.profileSub = this.profile.subscribe((data) => {
      this.profileData = data;
      
      if(!data._id && hasToken){
        this.profileStore.getProfile();
      }
    });
  }
}
