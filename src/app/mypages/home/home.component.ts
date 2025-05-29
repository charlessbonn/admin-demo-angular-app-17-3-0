import { Component, inject } from '@angular/core';
import { UserServicesService } from '../../myservices/user-services.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userServices = inject(UserServicesService);

  async ngOnInit() {
    const user = await this.userServices.getUser();
  }
}
