import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routeNames } from '../../app.routes';
import { Router, RouterModule } from '@angular/router';
import { UserServicesService } from '../../myservices/user-services.service';
import { CommonModule } from '@angular/common';
import { AppLogoComponent } from "../../mywidgets/app-logo/app-logo.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, AppLogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router);
  userServices = inject(UserServicesService);
  
  loading = false;
  email = "";
  password = "";
  forgotPasswordLink = `/${routeNames.forgotPassword.path}`;

  ngOnInit() {
    // 
  }

  async onSubmit() {
    this.loading = true;
    const result = await this.userServices.login(
      this.email,
      this.password
    );

    this.loading = false;

    if(result.success){
      this.router.navigate([routeNames.home.path]);
    }
  }
}
