import {Component} from '@angular/core';
import { menu } from '../../mock-data/menus';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = menu;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
}
