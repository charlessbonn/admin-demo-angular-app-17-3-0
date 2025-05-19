import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { routeNames } from '../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = "";
  password = "";
  forgotPasswordLink = `/${routeNames.forgotPassword.path}`;

  async onSubmit() {
    //
  }
}
