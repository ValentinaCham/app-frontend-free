import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpaceComponent } from './space/space.component';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, SpaceComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
