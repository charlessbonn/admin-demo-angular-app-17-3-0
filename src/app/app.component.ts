import { Component, inject, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgbDropdownModule, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from "./mywidgets/footer/footer.component";
import { AppLogoComponent } from "./mywidgets/app-logo/app-logo.component";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { routeNames } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, NgbDropdownModule, AppLogoComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'admin-demo-angular-app';

  // Track Navigation
  offcanvasService = inject(NgbOffcanvas);
  router = inject(Router);
  isLoginPage = false;
  nonUserRoutes = [
    "/",
    "/forgot-password",
  ];

  constructor() {
    this.trackNavigation();
  }

  private trackNavigation() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(event => {
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
}
