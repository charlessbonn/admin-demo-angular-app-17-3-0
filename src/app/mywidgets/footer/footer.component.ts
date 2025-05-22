import { Component } from '@angular/core';
import { Version } from '../../utils/constants';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  version = `v${Version.static}`
}
