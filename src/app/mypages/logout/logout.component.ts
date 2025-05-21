import { Component, inject } from '@angular/core';
import { AppLogoComponent } from "../../mywidgets/app-logo/app-logo.component";
import { routeNames } from '../../app.routes';
import { UserServicesService } from '../../myservices/user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [AppLogoComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  router = inject(Router);
  userServices = inject(UserServicesService);

  async ngOnInit() {
    const result = await this.userServices.logout();

    if (result) {
      this.router.navigate([routeNames.login.path]);
    }
  }
}
